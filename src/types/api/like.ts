import type ApiDefaultResponse from './default';

export interface LikeResponse extends ApiDefaultResponse {
  user: string; // 사용자 id
  post: string; // 포스트 id
}
