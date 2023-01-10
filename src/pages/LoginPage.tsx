import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { tokenState, userState } from '../recoil/atoms/user';
import { login, logout } from '../utils/api/user';
import { AxiosError } from 'axios';

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
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const { user, token } = await login(data);
      setUser(user);
      setToken(token);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response?.data) {
        alert(error.response.data);
      } else {
        alert('서버와 통신 중 문제가 발생했습니다.');
      }
    }
  };

  const onClickLogoutButton = async () => {
    await logout();
    setUser({});
    setToken('');
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <button onClick={onClickLogoutButton}>Logout</button>
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
