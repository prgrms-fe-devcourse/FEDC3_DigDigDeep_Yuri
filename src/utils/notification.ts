import axiosInstance from './axios';

interface LikeParam {
  (type: string, dataId: string, userId: string, postId: string): void;
}

export const getNotification = async () => {
  const { data } = await axiosInstance.get(`/notifications`);
  return data;
};

export const seenNotification = async () => {
  await axiosInstance.put(`/notifications/seen`);
};

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
