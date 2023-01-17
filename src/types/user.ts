import { UserResponse } from './response';

export type User = Pick<
  UserResponse,
  '_id' | 'image' | 'fullName' | 'likes' | 'comments' | 'email' | 'following'
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
