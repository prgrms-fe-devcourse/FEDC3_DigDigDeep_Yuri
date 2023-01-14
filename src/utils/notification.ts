import axiosInstance from './axios';

interface LikeParam {
  (type: string, dataId: string, userId: string, postId: string): void;
}

export const sendNotification: LikeParam = async (
  type,
  dataId,
  userId,
  postId
) =>
  await axiosInstance.post(`/notifications/create`, {
    notificationType: type,
    notificationTypeId: dataId,
    userId,
    postId,
  });
