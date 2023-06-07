import type DefaultResponse from './default';
import type { CommentResponse } from './comment';
import type { LikeResponse } from './like';
import type { PostResponse } from './post';
import type { NotificationResponse } from './notification';
import type { FollowResponse } from './follow';

export interface UserResponse extends DefaultResponse {
  coverImage: string; // 커버 이미지
  image: string; // 프로필 이미지
  role: string;
  isOnline: boolean;
  posts: PostResponse[];
  likes: LikeResponse[];
  comments: CommentResponse[];
  followers: FollowResponse[];
  following: FollowResponse[];
  notifications: NotificationResponse[];
  messages: [];
  fullName: string;
  email: string;
}

export interface LoginResponse {
  user: UserResponse;
  token: string;
}
