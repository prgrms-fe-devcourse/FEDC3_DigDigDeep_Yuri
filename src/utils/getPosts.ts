import { PostResponse } from '../types/response';
import axiosInstance from './axios';

const getPosts = async () => {
  // 10개만 offset으로 무한스크롤 구현 가능
  const { data } = await axiosInstance.get<PostResponse[]>(`/posts?limit=10`);
  return data;
};

export default getPosts;
