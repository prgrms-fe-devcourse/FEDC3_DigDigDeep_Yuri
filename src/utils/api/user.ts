import { LoginResponse } from '../../types/response';
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
