export interface User {
  coverImage?: string;
  image?: string;
  role?: string;
  isOnline?: boolean;
  comments?: string[];
  _id?: string;
  fullName?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserResponse {
  user: User;
  token: string;
}
