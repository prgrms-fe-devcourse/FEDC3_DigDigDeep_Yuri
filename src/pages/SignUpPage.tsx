import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { signUp } from '../utils/api/user';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: {
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      await signUp(data);
      alert('가입되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response?.data) {
        alert(error.response.data);
      } else {
        alert('서버와 통신 중 문제가 발생했습니다.');
      }
    }
  };

  return (
    <div>
      <h1>Sign Up Page</h1>
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
        <label htmlFor="fullName">Name</label>
        <StyledInput
          id="fullName"
          type="text"
          {...register('fullName', {
            required: '이름을 입력해주세요.',
          })}
        />
        {errors.fullName && (
          <ErrorMessage>{errors.fullName.message}</ErrorMessage>
        )}
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
        <label htmlFor="confirmPassword">Confirm Password</label>
        <StyledInput
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', {
            validate: (value) =>
              value === watch('password') || '비밀번호가 일치하지 않습니다.',
          })}
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}
        <button disabled={isSubmitting}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;

const StyledInput = styled.input`
  display: block;
`;

const ErrorMessage = styled.span`
  color: red;
  display: block;
`;
