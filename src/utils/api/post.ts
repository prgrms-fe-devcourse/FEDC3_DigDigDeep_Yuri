import type { PostResponse } from '../../types/api/post';
import axiosInstance from '../axios';

export const createPost = async (
  title: string,
  image: Blob | null,
  channelId: string
) => {
  const formData = new FormData();

  formData.append('title', title);
  image && formData.append('image', image);
  formData.append('channelId', channelId);

  const { data } = await axiosInstance.post(`/posts/create`, formData);
  return data;
};

export const updatePost = async (
  postId: string,
  title: string,
  image: Blob | null,
  channelId: string,
  imageToDeletePublicId?: string | null
) => {
  const formData = new FormData();

  formData.append('postId', postId);
  formData.append('title', title);
  image && formData.append('image', image);
  formData.append('channelId', channelId);
  imageToDeletePublicId &&
    formData.append('imageToDeletePublicId', imageToDeletePublicId);

  await axiosInstance.put(`/posts/update`, formData);
};
interface GetPostProps {
  (limit: number, offset: number): Promise<PostResponse[]>;
}

export const getPosts: GetPostProps = async (limit, offset) => {
  const { data } = await axiosInstance.get<PostResponse[]>(
    `/posts?limit=${limit}&offset=${offset}`
  );
  return data;
};

export const getAllPosts = async () => {
  const { data } = await axiosInstance.get<PostResponse[]>(`/posts`);
  return data;
};

export const getPost = async (postId: string) => {
  const { data } = await axiosInstance.get<PostResponse>(`/posts/${postId}`);
  return data;
};

export const getPostsByAuthor = async (authorId: string) => {
  const { data } = await axiosInstance.get<PostResponse[]>(
    `/posts/author/${authorId}`
  );
  return data;
};

export const deletePost = async (postId: string) => {
  await axiosInstance.delete(`/posts/delete`, { data: { id: postId } });
};
