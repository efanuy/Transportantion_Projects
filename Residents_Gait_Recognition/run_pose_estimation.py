import cv2
import numpy as np
import torchvision.models.detection
import torchvision.transforms as T
from torchvision.utils import draw_keypoints
import matplotlib.pyplot as plt

input_path = "./input/image_2.jpg"
img = cv2.imread(input_path)
h,w,z= img.shape

# 初始化模型
model = torchvision.models.detection.keypointrcnn_resnet50_fpn(pretrained = True)
# 设置评估模式
model.eval()

transform = T.Compose([T.ToTensor()])
img_tensor = transform(img)
output = model([img_tensor])[0]
print(img_tensor)

# 绘制人体关键点
def draw_keypoints_per_person(img, all_keypoints, all_scores, confs,
                          keypoint_threshold, conf_threshold):
    img_copy = img.copy()
    cmap = plt.get_cmap("rainbow")
    color_id = np.arange(1,255,255//len(all_keypoints)).tolist()[::-1]
    for person_id in range(len(all_keypoints)):
        if confs[person_id] > conf_threshold:
            keypoints = all_keypoints[person_id]
            scores = all_scores[person_id]
            for kp in range(len(scores)):
                if scores[kp] >keypoint_threshold:
                    keypoint = tuple(map(int,keypoints[kp,:2].detach().numpy().tolist()))
                    color = tuple(np.asarray(cmap(color_id[person_id]) )* 255)
                    cv2.circle(img_copy,keypoint,5,color,-1)
    return img_copy

keypoints_img = draw_keypoints_per_person(img,output["keypoints"],output["keypoints_scores"],output["scores"],
                                          keypoint_threshold=2,conf_threshold=0.9)

cv2.imshow('image_1',cv2.resize(img,(w,h)))
cv2.imshow('keypoints_img',cv2.resize(keypoints_img,(w,h)))
cv2.waitKey(0)