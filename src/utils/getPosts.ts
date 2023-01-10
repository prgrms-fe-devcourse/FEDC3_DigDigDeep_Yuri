import { PostResponse } from '../types/response';
import axiosInstance from './axios';

const getPosts = async () => {
  // 10개만 offset으로 무한스크롤 구현 가능
  try {
    const { data } = await axiosInstance.get<PostResponse[]>(`/posts?limit=10`);
    return data;
  } catch (error) {
    console.error(error);
    alert('API 처리 중 오류가 발생했습니다.');
  }
};

export default getPosts;
