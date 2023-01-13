import { LoginResponse, UserResponse } from '../../types/response';
import axiosInstance from '../axios';

export const signUp = async ({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}) => {
  await axiosInstance.post<LoginResponse>('/signup', {
    email,
    password,
    fullName,
  });
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post<LoginResponse>('/login', {
    email,
    password,
  });
  return data;
};

export const updateUserName = async ({ fullName }: { fullName: string }) => {
  await axiosInstance.put('/settings/update-user', {
    fullName,
  });
};

export const updatePassword = async ({ password }: { password: string }) => {
  await axiosInstance.put('/settings/update-password', {
    password,
  });
};

export const getUserInfo = async (userId: string) => {
  const { data } = await axiosInstance.get<UserResponse>(`/users/${userId}`);
  return data;
};

export const logout = async () => {
  await axiosInstance.post('/logout');
};

export const getUser = async (userId: string) => {
  const { data } = await axiosInstance.get<UserResponse>(`/users/${userId}`);
  return data;
};

export const getUsers = async () => {
  const { data } = await axiosInstance.get<UserResponse[]>('users/get-users');
  return data;
};
