import axiosInstance from './axios';

interface LikeParam {
  (dataId: string, userId: string, postId: string): void;
}

export const sendLikeNotification: LikeParam = async (dataId, userId, postId) =>
  await axiosInstance.post(`/notifications/create`, {
    notificationType: 'LIKE',
    notificationTypeId: dataId,
    userId: userId,
    postId: postId,
  });
