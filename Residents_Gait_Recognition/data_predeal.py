import os
import time

import cv2
import numpy as np
import torchvision.models.detection
import torchvision.transforms as T
from sqlalchemy.dialects.oracle.dictionary import all_sequences

from run_pose_estimation_2 import draw_keypoints_per_person
from run_pose_estimation_2 import draw_skeletons_per_person

all_sequences = {} #存放所有人的关键点
def extract_keypoints_per_person(all_keypoints, all_scores, confs,
                              keypoint_threshold=2, conf_threshold=0.9):
    for person_id in range(len(all_keypoints)):
        if confs[person_id] > conf_threshold:
            keypoints = all_keypoints[person_id]
            scores = all_scores[person_id]
            keypoints_list = []
            for kp in range(len(scores)):
                #if scores[kp] > keypoint_threshold:
                keypoint = tuple(map(int, keypoints[kp, :2].detach().numpy().tolist()))
                keypoints_list.append(keypoint)
            if person_id not in all_sequences.keys():
                sequence = []
                sequence.append(np.array(keypoints_list))
                all_sequences[person_id] = sequence
            else:
                sequence = all_sequences.get(person_id)
                sequence.append(np.array(keypoints_list))
                all_sequences[person_id] = sequence


# 视频读取
#input_video = './input/person' + str(fid+1) + '.mp4'
input_video = './input/crowdhuman.mp4'
print("current input_video is:",input_video)
cap = cv2.VideoCapture(input_video)
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)) #帧宽度
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)) #帧高度
fps = cap.get(cv2.CAP_PROP_FPS) #帧率
count_frame= int(cap.get(cv2.CAP_PROP_FRAME_COUNT))


# 逐帧读取视频
current_frame = 0
start_time = time.time()
while True:
    ret, frame = cap.read()
    if not ret:
        break
   # print(frame)
    transform = T.Compose([T.ToTensor()])
    img_tensor = transform(frame)
    model = torchvision.models.detection.keypointrcnn_resnet50_fpn(pretrained = True)
    model.eval()
    output = model([img_tensor])[0]
    # 绘制每一帧的人体关键点


    # 提取每个人的动态关键点
    keypoints_img = extract_keypoints_per_person( output["keypoints"], output["keypoints_scores"], output["scores"],
                                                  keypoint_threshold=2, conf_threshold=0.9)
    current_frame += 1
    cost_time = time.time() - start_time
    current_fps = current_frame / cost_time
    remaining_time = (count_frame - current_frame) / current_fps if current_fps > 0 else 0
    # 显示进度
    if current_frame % 10 == 0:
        print(f"进度:{current_frame} / {count_frame}帧 | 当前FPS:{current_fps:.2f} | "
            f"剩余时间：{remaining_time / 60:.2f}分钟")
    # if current_frame >= 100:
    #    break
# print(all_sequences)

# 保存每个人的步态数据
for person_id in all_sequences.keys():
    sequences = all_sequences.get(person_id)
    save_dir = os.path.join('pose_data/crowd', str(person_id))
    print("save current data to :",save_dir)
    if not os.path.exists(save_dir):
        os.makedirs(save_dir,exist_ok=True)
    c = 0 #视频帧计数器
    seq_item = []
    k = 0 #文件计数器
    for seq in sequences:
        seq_item.append(seq)
        c += 1
        if c % 40 == 0:
            np.save(save_dir + "/seq_" + str(format(k,"02d")) + ".npy", np.array(seq_item))
            seq_item.clear()
            k += 1
        elif c == len(sequences) and len(seq_item) > 20:
            np.save(save_dir + "/seq_" + str(format(k, "02d")) + ".npy", np.array(seq_item))