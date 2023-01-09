import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { LoginResponse } from '../types/user';
import axiosInstance from '../utils/axios';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { tokenState, userState } from '../recoil/atoms/user';

const LoginPage = () => {
  const [user, setUser] = useRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: 'minjongbaek@gmail.com',
      password: '',
    },
  });

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await axiosInstance.post<LoginResponse>('/login', {
        email,
        password,
      });
      setUser(data.user);
      setToken(data.token);
      // TODO: 페이지 이동
    } catch (error) {
      console.error(error);
      alert('입력한 정보와 일치하는 계정이 없습니다.');
    }
  };

  const logout = async () => {
    await axiosInstance.post('/logout');
    setUser({});
    setToken('');
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(login)}>
        <label htmlFor="email">Email</label>
        <StyledInput
          id="email"
          type="email"
          {...register('email', {
            required: '이메일을 입력해주세요.',
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <label htmlFor="password">Password</label>
        <StyledInput
          id="password"
          type="password"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <button disabled={isSubmitting}>Login</button>
      </form>
      {user.fullName && (
        <div>
          <h2>Hello, {user.fullName}</h2>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

const StyledInput = styled.input`
  display: block;
`;

const ErrorMessage = styled.span`
  color: red;
  display: block;
`;
