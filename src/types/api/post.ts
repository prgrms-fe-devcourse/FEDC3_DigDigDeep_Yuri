import type DefaultResponse from './default';
import type { ChannelResponse } from './channel';
import type { CommentResponse } from './comment';
import type { LikeResponse } from './like';
import type { UserResponse } from './user';

export interface PostResponse extends DefaultResponse {
  likes: LikeResponse[];
  comments: CommentResponse[];
  image?: string;
  imagePublicId?: string;
  title: string;
  channel?: ChannelResponse;
  author: UserResponse;
}
