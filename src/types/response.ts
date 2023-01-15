interface BasicResponse {
  _id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserResponse extends BasicResponse {
  coverImage: string; // 커버 이미지
  image: string; // 프로필 이미지
  role: string;
  emailVerified: Boolean; // 사용되지 않음
  banned: boolean; // 사용되지 않음
  isOnline: boolean;
  posts: PostResponse[];
  likes: LikeResponse[];
  comments: CommentResponse[];
  followers: [];
  following: [];
  notifications: NotificationResponse[];
  messages: [];
  fullName: string;
  email: string;
}

export interface ChannelResponse extends BasicResponse {
  authRequired: boolean; // 사용되지 않음
  posts: string[];
  name: string;
  description: string;
}

export interface PostResponse extends BasicResponse {
  likes: LikeResponse[];
  comments: CommentResponse[];
  image?: string;
  imagePublicId?: string;
  title: string;
  channel?: ChannelResponse;
  author: UserResponse;
}

export interface LikeResponse extends BasicResponse {
  user: string; // 사용자 id
  post: string; // 포스트 id
}

export interface CommentResponse extends BasicResponse {
  comment: string;
  author: UserResponse;
  post: string; // 포스트 id
}

export interface NotificationResponse extends BasicResponse {
  seen: boolean;
  author: UserResponse;
  user: UserResponse | String;
  post: string | null; // 포스트 id
  like: LikeResponse;
  follow?: string; // 사용자 id
  comment?: CommentResponse;
}

export interface FollowResponse extends BasicResponse {
  user: string; // 사용자 id
  follower: string; // 사용자 id
}

export interface LoginResponse {
  user: UserResponse;
  token: string;
}
