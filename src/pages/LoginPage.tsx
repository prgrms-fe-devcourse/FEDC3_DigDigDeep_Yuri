import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axiosInstance from '../utils/axios';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { tokenState, userState } from '../recoil/atoms/user';
import type { LoginResponse } from '../types/response';

const LoginPage = () => {
  return <div>LoginPage</div>;
};

export default LoginPage;
