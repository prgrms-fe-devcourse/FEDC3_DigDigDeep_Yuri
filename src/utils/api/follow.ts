import { FollowResponse } from '../../types/response';
import axiosInstance from '../axios';

export const follow = async ({ userId }: { userId: string }) => {
  const { data, status } = await axiosInstance.post<FollowResponse>(
    '/follow/create',
    {
      userId,
    }
  );
  if (status === 200) return data;
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
