import type DefaultResponse from './default';
import type { UserResponse } from './user';

export interface CommentResponse extends DefaultResponse {
  comment: string;
  author: UserResponse;
  post: string; // 포스트 id
}
