import { PostResponse } from '../types/response';
import axiosInstance from './axios';

const getPost = async (postId: string) => {
  const { data } = await axiosInstance.get<PostResponse>(`/posts/${postId}`);
  return data;
};

export default getPost;
