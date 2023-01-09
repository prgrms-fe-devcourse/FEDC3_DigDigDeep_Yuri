export interface User {
  image?: string;
  _id?: string;
  fullName?: string;
}

export interface UserResponse {
  coverImage: string;
  image: string;
  role: string;
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
