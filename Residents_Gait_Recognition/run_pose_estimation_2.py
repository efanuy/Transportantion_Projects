import cv2
import numpy as np
import torchvision.models.detection
import torchvision.transforms as T
from torchvision.utils import draw_keypoints
import matplotlib.pyplot as plt

input_path = "./input/image_1.jpg"
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
                          keypoint_threshold=2, conf_threshold=0.9):
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
                    cv2.circle(img_copy,keypoint,6,color,-1)
    return img_copy

keypoints = ['nose','left_eye','right_eye','left_ear','right_ear',
             'left_shoulder','right_shoulder','left_elbow','right_elbow','left_wrist','right_wrist',
             'left_hip','right_hip','left_knee','right_knee','left_ankle','right_ankle']
def get_limbs_by_keypoints(keypoints):
    limbs = [
        [keypoints.index('left_eye'),keypoints.index('nose')],
        [keypoints.index('left_eye'), keypoints.index('left_ear')],
        [keypoints.index('right_eye'), keypoints.index('nose')],
        [keypoints.index('right_eye'), keypoints.index('right_ear')],
        [keypoints.index('nose'), keypoints.index('left_shoulder')],
        [keypoints.index('left_shoulder'), keypoints.index('left_elbow')],
        [keypoints.index('left_elbow'), keypoints.index('left_wrist')],
        [keypoints.index('nose'), keypoints.index('right_shoulder')],
        [keypoints.index('right_shoulder'), keypoints.index('right_elbow')],
        [keypoints.index('right_elbow'), keypoints.index('right_wrist')],
        [keypoints.index('left_shoulder'), keypoints.index('left_hip')],
        [keypoints.index('left_hip'), keypoints.index('left_knee')],
        [keypoints.index('left_knee'), keypoints.index('left_ankle')],
        [keypoints.index('right_shoulder'), keypoints.index('right_hip')],
        [keypoints.index('right_hip'), keypoints.index('right_knee')],
        [keypoints.index('right_knee'), keypoints.index('right_ankle')],
        [keypoints.index('left_shoulder'), keypoints.index('right_shoulder')],
        [keypoints.index('left_hip'), keypoints.index('right_hip')],
    ]
    return limbs

limbs = get_limbs_by_keypoints(keypoints)

def draw_skeletons_per_person(img, all_keypoints, all_scores, confs,all_boxes,
                          keypoint_threshold=2, conf_threshold=0.9):
    img_copy = img.copy()
    cmap = plt.get_cmap("rainbow")
    color_id = np.arange(1, 255, 255 // len(all_keypoints)).tolist()[::-1]
    for person_id in range(len(all_keypoints)):
        if confs[person_id] > conf_threshold:
            keypoints = all_keypoints[person_id]
            box = all_boxes[person_id].detach().numpy().astype(np.int32)
            x1,y1,x2,y2 = box
            cv2.rectangle(img_copy,(x1,y1),(x2,y2),(0,0,255),2)
            text = f"Person:{confs[person_id]:.2f}"
            cv2.putText(
                img_copy,
                text,
                (x1,y1-10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                (0, 255, 0),
                2
            )
            # print(keypoints)
            for limb_id in range(len(limbs)):
                limb_loc1 = keypoints[limbs[limb_id][0],:2].detach().numpy().astype(np.int32)
                limb_loc2 = keypoints[limbs[limb_id][1],:2].detach().numpy().astype(np.int32)
                limb_score = min(all_scores[person_id,limbs[limb_id][0]],all_scores[person_id,limbs[limb_id][1]])
                if limb_score > keypoint_threshold:
                    color = tuple(np.asarray(cmap(color_id[person_id])[:-1])*255)
                    cv2.line(img_copy,tuple(limb_loc1),tuple(limb_loc2),color,5)
    return img_copy


if __name__ == '__main__':
    # 绘制人体关键点
    keypoints_img = draw_keypoints_per_person(img,output["keypoints"],output["keypoints_scores"],output["scores"],
                                              keypoint_threshold=2,conf_threshold=0.9)

    # 绘制人体骨骼
    skeletons_img = draw_skeletons_per_person(img,output["keypoints"],output["keypoints_scores"],output["scores"],
                                              output["boxes"],keypoint_threshold=2,conf_threshold=0.9)


    cv2.imshow('image_1',cv2.resize(img,(w//5,h//5)))
    cv2.imshow('keypoints_img',cv2.resize(keypoints_img,(w//5,h//5)))
    cv2.imshow('skeletons_img',cv2.resize(skeletons_img,(w//5,h//5)))
    cv2.waitKey(0)