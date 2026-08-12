import time

import cv2
import torchvision.models.detection
import torchvision.transforms as T
from run_pose_estimation_2 import draw_keypoints_per_person
from run_pose_estimation_2 import draw_skeletons_per_person

# 视频读取
input_video = './input/crowdhuman.mp4'
cap = cv2.VideoCapture(input_video)
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)) #帧宽度
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)) #帧高度
fps = cap.get(cv2.CAP_PROP_FPS) #帧率
count_frame= int(cap.get(cv2.CAP_PROP_FRAME_COUNT))


#视频的写入
fourcc = cv2.VideoWriter_fourcc(*'mp4v') #设置写入格式
out = cv2.VideoWriter('./output/crowhuman_result2.mp4',fourcc,fps,(frame_width,frame_height))



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
    keypoints_img = draw_keypoints_per_person(frame, output["keypoints"], output["keypoints_scores"], output["scores"],
                                              keypoint_threshold=2, conf_threshold=0.9)

    # 绘制每一帧的人体骨骼
    skeletons_img = draw_skeletons_per_person(keypoints_img, output["keypoints"], output["keypoints_scores"], output["scores"],
                                              output["boxes"],keypoint_threshold=2, conf_threshold=0.9)
    out.write(skeletons_img)
    current_frame += 1
    #cv2.imshow(f'frame:{current_frame}',frame)
    #cv2.imshow(f'keypoints_img{current_frame}',keypoints_img)
    # cv2.imshow(f'skeletons_img{current_frame}',skeletons_img)
    cv2.waitKey(0)

# 释放资源
out.release()