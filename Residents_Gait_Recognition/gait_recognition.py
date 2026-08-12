import os
import pickle
import time

import cv2
import numpy as np
from pyexpat import features

import torch
import torchvision
from dask.array import reshape
from nltk import accuracy
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sympy import num_digits
from sympy.core.random import shuffle
from torch import nn, optim
from torch.utils.data import Dataset, DataLoader
from tqdm import tqdm
import torchvision.transforms as T


class PositionalEncoding(nn.Module):
    def __init__(self,d_model,max_len = 5000):
        super(PositionalEncoding, self).__init__()
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float()*(-np.log(10000) / d_model))
        pe[:,0::2] = torch.sin(position * div_term)
        pe[:,1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe)
    def forward(self, x):
        return x + self.pe[:x.size(1),:].unsqueeze(0)


class GaitTransformer(nn.Module):
    def __init__(self, input_dim=34, d_model=128, nhead=8, num_layers=4, dim_feadforward=512, num_classes=10):
        super(GaitTransformer, self).__init__()
        self.input_proj = nn.Linear(input_dim,d_model) # 输入投影层
        self.pose_encoder = PositionalEncoding(d_model) # 位置编码
        # 定义Transformer编码器基础层
        encoder_layer = nn.TransformerEncoderLayer(
                d_model = d_model,
                nhead = nhead,
                dim_feedforward = dim_feadforward,
                dropout = 0.1
        )
        self.transformer_encoder = nn.TransformerEncoder(encoder_layer, num_layers=num_layers)
        self.global_pooling = nn.AdaptiveAvgPool1d(1)
        self.fc = nn.Linear(d_model,256)
        self.classifier = nn.Linear(256, num_classes)

    def forward(self, x):
        batch_size, seq_len_, num_joints, _ = x.shape
        x = x.reshape(batch_size,seq_len_, num_joints*2)
        x = self.input_proj(x)
        x = self.pose_encoder(x)
        x = x.permute(1,0,2)
        output = self.transformer_encoder(x)
        output = output.permute(1,0,2)
        output = self.global_pooling(output.transpose(1,2)).squeeze(2)
        features = self.fc(output)
        logits = self.classifier(features)
        return features, logits

class PoseDataset:
    def __init__(self, samples, max_seq_len=40):
        self.samples = samples
        self.max_seq_len = max_seq_len
    def __len__(self):
        return len(self.samples)
    def __getitem__(self,idx):
        pose_seq_path, label = self.samples[idx]
        pose_seq = np.load(pose_seq_path)
        if len(pose_seq) > self.max_seq_len:
            pose_seq = pose_seq[:self.max_seq_len]
        else:
            padding_length = self.max_seq_len - len(pose_seq)
            pose_seq = np.pad(pose_seq, ((0,padding_length),(0,0),(0,0)),mode = 'constant')
            pose_seq = pose_seq.astype(np.float32)
        return pose_seq,label

def data_split(data_dir):
    samples = [] # 存放路径与标签
    labels = [] # 单独存放标签
    for label,subject in enumerate(sorted([int(x) for x in os.listdir(data_dir)])):
        subject_dir = os.path.join(data_dir, str(subject))
        if os.path.isdir(subject_dir):
            for seq_file in os.listdir(subject_dir):
                if seq_file.endswith(".npy"):
                    seq_path = os.path.join(subject_dir, seq_file)
                    samples.append((seq_path,label))
                    labels.append(label)
    # 分层抽样
    train_samples, val_samples = train_test_split(
        samples,
        test_size=0.3,
        random_state=42,
        stratify=labels
    )

    train_labels = [s[1] for s in train_samples]
    val_labels = [s[1] for s in val_samples]
    print(f"训练集标签: {set(train_labels)},训练集数据：{len(train_samples)}")
    print(f"验证集标签: {set(val_labels)},验证集数据：{len(val_samples)}")
    return train_samples,val_samples

def train_transformer_model(data_dir,batch_size=4,epochs=50,lr=1e-4):
    # 通过分层抽样的方法划分训练数据集与验证数据集
    train_sample,val_sample = data_split(data_dir)
    # 封装步态数据
    train_dataset = PoseDataset(train_sample, max_seq_len=40)
    val_dataset = PoseDataset(val_sample, max_seq_len=40)
    train_loader = DataLoader(train_dataset, batch_size=4, shuffle=True, num_workers=4)
    val_loader = DataLoader(val_dataset, batch_size=4, shuffle=True, num_workers=4)
    # 初始化模型
    model = GaitTransformer(num_classes=len(os.listdir(data_dir)))
    # 设置运行设备
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    # device = torch.device('cpu')
    model.to(device)
    # 定义损失函数和优化器
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=lr)
    # 训练循环
    for epochs in range(epochs):
        model.train()
        running_loss = 0
        correct = 0
        total = 0
        for inputs, labels in tqdm(train_loader, desc=f'Epoch{epochs + 1} / {epochs}'):
            inputs, labels = inputs.to(device), labels.to(device)
            optimizer.zero_grad()
            _,outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()
            _,predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()
        train_loss = running_loss / len(train_loader)
        train_acc = 100.* correct/total
        print(f"train_loss:{train_loss}, train_acc:{train_acc:.4f}%")

        # 验证
        model.eval()
        model.eval()
        val_loss = 0
        val_correct = 0
        val_total = 0
        with torch.no_grad():
            for inputs, labels in val_loader:
                input, labels = inputs.to(device), labels.to(device)
                _,outputs = model(inputs)
                loss = criterion(outputs, labels)
                val_loss += loss.item()
                _,predicted = outputs.max(1)
                val_total += labels.size(0)
                val_correct += predicted.eq(labels).sum().item()
            val_loss = val_loss /len(val_loader)
            val_acc = 100. * val_correct / val_total
        print(f'Epoch {epochs+1}, Train Loss:{train_loss:.4f}, Train Acc:{train_acc:.2f}%,'
              f'Val Loss:{val_loss:4f}, Val Acc:{val_acc:2f}%')

    #保存模型
    torch.save(model.state_dict(), 'output/gait_transformer.pth')
    return model

def extract_features(transformer_model, dataset, device):
    # 设置评估模式
    transformer_model.eval()
    features = []
    labels = []
    dataloader = DataLoader(dataset, batch_size=4, shuffle=True, num_workers=4)
    with torch.no_grad():
        for inputs, label in tqdm(dataloader, desc="提取特征"):
            inputs = inputs.to(device)
            feature,_ = transformer_model(inputs)
            features.extend(feature.cpu().numpy())
            labels.extend(label.cpu().numpy())
    return np.array(features), np.array(labels)

def train_svm_classifier(transformer_model, data_dir):
    train_samples, val_samples = data_split(data_dir)
    # 封装步态数据
    train_dataset = PoseDataset(train_samples, max_seq_len=40)
    val_dataset = PoseDataset(val_samples, max_seq_len=40)
    # 准备设备
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    # device = torch.device('cpu')
    transformer_model.to(device)
    #提取训练集和验证集的特征
    train_features, train_labels = extract_features(transformer_model, train_dataset, device)
    val_features, val_labels = extract_features(transformer_model, train_dataset, device)

    #训练SVM分类器
    svm = SVC(kernel='rbf', probability=True, C=4, gamma='scale')
    svm.fit(train_features, train_labels)
    # 评估
    y_pred = svm.predict(val_features)
    accuracy = accuracy_score(val_labels, y_pred)
    print(f"svm classifier Accuracy:{accuracy:.4f}")
    # 保存模型
    with open('gait_svm_classifier.pkl', 'wb') as f:
        pickle.dump(svm, f)
    return svm

def detect_keypoints(img, pose_model):
    transform = T.Compose([T.ToTensor()])
    img_tensor = transform(img)
    output = pose_model([img_tensor])[0]
    all_keypoints = output["keypoints"]
    all_scores = output["keypoints_scores"]
    confs = output["scores"]
    conf_threshold = 0.9
    target_keypoints = []
    for person_id in range(len(all_keypoints)):
        if confs[person_id] > conf_threshold:
            keypoints = all_keypoints[person_id]
            scores = all_scores[person_id]
            for kp in range(len(scores)):
                keypoint = list(map(int, keypoints[kp,:2].detach().numpy().tolist()))
                target_keypoints.append(keypoint)
        if len(target_keypoints) == 0:
            break
    return target_keypoints


def  extract_gait_sequence(video_path, pose_model):
    # 从视频中提取步态序列数据
    cap = cv2.VideoCapture(video_path)
    sequence = []
    seq_length = 40
    while len(sequence) < seq_length:
        ret, frame = cap.read()
        if not ret:
            break
        # 检测关键点
        keypoints = detect_keypoints(frame, pose_model)
        sequence.append(keypoints)
    # 填充或裁剪到固定长度
    if len(sequence) < seq_length:
        padding = [np.zeros((17,2)) for _ in range(seq_length - len(sequence))]
        sequence = sequence + padding
    else:
        sequence = sequence[:seq_length]
    return np.array(sequence)

def recognize_gait(data_dir, transformer_model, svm_classifier):
    # 初始化模型
    model = torchvision.models.detection.keypointrcnn_resnet50_fpn(pretrained = True)
    model.eval()
    gait_sequence = extract_gait_sequence(data_dir, model)
    gait_sequence =torch.tensor(gait_sequence, dtype=torch.float32).unsqueeze(0)
    # 设置设备
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    # device = torch.device("cpu")
    transformer_model.to(device)
    transformer_model.eval()
    with torch.no_grad():
        # 提取步态特征
        feature, _ = transformer_model(gait_sequence.to(device))
        feature = feature.cpu().numpy()
    # 使用SVM分类器对步态特征进行预测分类
    predict = svm_classifier.predict(feature)
    confidence = svm_classifier.predict_proba(feature).max()
    return predict[0], confidence

if __name__ == '__main__':
    # 1训练步态特征模型
    train_transformer_model = train_transformer_model('./pose_data/to')
    # start_time = time.time()
    # # 初始化和加载模型
    # transformer_model = GaitTransformer(num_classes=len(os.listdir('./pose_data/crowd')))
    # transformer_model.load_state_dict(torch.load("output/gait_transformer.pth", map_location=torch.device("cuda" if torch.cuda.is_available() else "cpu")))
    # # transformer_model.load_state_dict(torch.load("gait_transformer.pth", map_location=torch.device("cpu")))
    #
    # # 2训练SVM分类器
    # svm_classifier = train_svm_classifier(transformer_model, './pose_data/crowd')
    #
    # # 初始化和加载SVM分类器
    # with open('gait_svm_classifier.pkl', 'rb') as f:
    #     svm_classifier = pickle.load(f)
    #
    # # 3识别新视频中的步态
    # predict, confidence = recognize_gait("./input/target_person.mp4"
    #                                      , transformer_model, svm_classifier)
    #
    # print(f"predict:{predict}, confidence:{confidence:.4f}")
    #
    # end_time = time.time()
    # print(f"代码执行时间：{end_time - start_time:.6f}秒")