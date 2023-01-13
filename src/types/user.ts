import { UserResponse } from './response';

export type User = Pick<
  UserResponse,
  '_id' | 'image' | 'fullName' | 'likes' | 'email' | 'following'
>;

export interface LoginResponse {
  user: UserResponse;
  token: string;
}
