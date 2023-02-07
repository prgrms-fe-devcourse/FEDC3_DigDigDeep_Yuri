import type DefaultResponse from './default';

export interface ChannelResponse extends DefaultResponse {
  posts: string[];
  name: string;
  description: string;
}
