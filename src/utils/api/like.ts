import axiosInstance from '../axios';

export const deleteLike = async (likeId: string) =>
  await axiosInstance.delete(`/likes/delete`, {
    data: { id: likeId },
  });

export const createLike = async (postId: string) =>
  await axiosInstance.post(`/likes/create`, {
    postId: postId,
  });
