import axiosInstance from './axios';

export const deleteFollow = async (userId: string) =>
  await axiosInstance.delete(`/follow/delete`, {
    data: { id: userId },
  });

export const createFollow = async (userId: string) =>
  await axiosInstance.post(`/follow/create`, {
    userId,
  });
