import type { CommentResponse } from '../../types/api/comment';
import axiosInstance from '../axios';

interface CommentParam {
  (comment: string, postId: string): Promise<CommentResponse>;
}

export const createComment: CommentParam = async (comment, postId) => {
  const { data } = await axiosInstance.post(`/comments/create`, {
    comment,
    postId,
  });

  return data;
};

export const deleteComment = async (commentId: string) => {
  await axiosInstance.delete(`/comments/delete`, { data: { id: commentId } });
};
