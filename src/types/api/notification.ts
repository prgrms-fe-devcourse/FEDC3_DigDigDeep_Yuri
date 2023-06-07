import type ApiDefaultResponse from './default';
import type { CommentResponse } from './comment';
import type { LikeResponse } from './like';
import type { UserResponse } from './user';

export interface NotificationResponse extends ApiDefaultResponse {
  seen: boolean;
  author: UserResponse;
  user: UserResponse | string;
  post: string | null; // 포스트 id
  like: LikeResponse;
  follow?: string; // 사용자 id
  comment?: CommentResponse;
}
