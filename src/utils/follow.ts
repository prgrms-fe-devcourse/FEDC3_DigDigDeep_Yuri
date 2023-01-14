import axiosInstance from './axios';

export const deleteFollow = async (followId: string) =>
  await axiosInstance.delete(`/follow/delete`, {
    data: { id: followId },
  });

export const createFollow = async (userId: string) =>
  await axiosInstance.post(`/follow/create`, {
    userId,
  });
