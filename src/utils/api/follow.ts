import type { FollowResponse } from '../../types/api/follow';
import axiosInstance from '../axios';

export const follow = async ({ userId }: { userId: string }) => {
  const { data } = await axiosInstance.post<FollowResponse>('/follow/create', {
    userId,
  });
  return data;
};

export const unfollow = async ({ followId }: { followId: string }) => {
  const { data } = await axiosInstance.delete<FollowResponse>(
    '/follow/delete',
    {
      data: {
        id: followId,
      },
    }
  );
  return data;
};
