import type DefaultResponse from './default';

export interface FollowResponse extends DefaultResponse {
  user: string; // 사용자 id
  follower: string; // 사용자 id
}
