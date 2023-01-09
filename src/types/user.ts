export interface User {
  image?: string;
  _id?: string;
  fullName?: string;
}

export interface UserResponse {
  coverImage: string; // 커버 이미지
  image: string; // 프로필 이미지
  role: string;
  emailVerified: boolean; // 사용되지 않음
  banned: boolean; // 사용되지 않음
  isOnline: boolean;
  posts: [];
  likes: [];
  comments: string[];
  followers: [];
  following: [];
  notifications: [];
  messages: [];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: UserResponse;
  token: string;
}
