import type { UserResponse } from '../api/user';

export type RecoilUser = Pick<
  UserResponse,
  | '_id'
  | 'image'
  | 'fullName'
  | 'likes'
  | 'comments'
  | 'email'
  | 'following'
  | 'notifications'
>;
