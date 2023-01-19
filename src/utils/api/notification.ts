import axiosInstance from '../axios';

interface LikeParam {
  (type: string, dataId: string, userId: string, postId: string | null): void;
}

export const getNotifications = async () => {
  const { data } = await axiosInstance.get(`/notifications`);
  return data;
};

export const seenNotifications = async () => {
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
