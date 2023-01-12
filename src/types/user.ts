import { UserResponse } from './response';

export type User = Pick<
  Partial<UserResponse>,
  '_id' | 'image' | 'fullName' | 'likes'
>;

export interface LoginResponse {
  user: UserResponse;
  token: string;
}

export interface FollowResponse {
  _id: string;
  user?: string;
  follower?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
