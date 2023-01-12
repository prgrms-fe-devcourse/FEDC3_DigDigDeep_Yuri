import { PostResponse } from '../types/response';
import axiosInstance from './axios';

interface PostParam {
  (title: string, image: number | null, channelId: string): void;
}

export const createPost: PostParam = async (title, image, channelId) => {
  await axiosInstance.post(`/posts/create`, {
    title,
    image,
    channelId,
  });
};

export const updatePost = async (
  postId: string,
  title: string,
  image: number | null,
  channelId: string,
  imageToDeletePublicId?: string
) => {
  await axiosInstance.put(`/posts/update`, {
    postId,
    title,
    image,
    channelId,
    imageToDeletePublicId,
  });
};

export const getPosts = async () => {
  // 10개만 offset으로 무한스크롤 구현 가능
  const { data } = await axiosInstance.get<PostResponse[]>(`/posts?limit=10`);
  return data;
};

export const getPost = async (postId: string) => {
  const { data } = await axiosInstance.get<PostResponse>(`/posts/${postId}`);
  return data;
};

export const getPostByAuthor = async (authorId: string) => {
  const { data } = await axiosInstance.get<PostResponse>(
    `/posts/author/${authorId}`
  );
  return data;
};

export const deletePost = async (postId: string) => {
  await axiosInstance.delete(`/posts/delete`, { data: { id: postId } });
};
