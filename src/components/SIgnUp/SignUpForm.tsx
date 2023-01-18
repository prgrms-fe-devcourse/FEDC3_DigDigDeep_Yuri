import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { signUp } from '../../utils/api/user';
import UserForm from '../UserForm/UserForm';
import FormInput from '../UserForm/FormInput';
import FormButton from '../UserForm/FormButton';
import ErrorMessage from '../UserForm/ErrorMessage';
import useToast from '../../hooks/useToast';
import { ROUTES } from '../../utils/routes';

const RESPONSE_ERROR_MESSAGE = 'The email address is already being used.';

const SignUpForm = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const { showToast } = useToast();

  const {
    handleSubmit,
    resetField,
    watch,
    control,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'all',
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
      setErrorMessage('');
      showToast({ message: '가입되었습니다.' });
      navigate(ROUTES.LOGIN);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        if (error.response?.data === RESPONSE_ERROR_MESSAGE) {
          setErrorMessage('이미 사용중인 이메일입니다.');
        }
      } else {
        showToast({ message: '서버와 통신 중 문제가 발생했습니다.' });
      }
    }
  };

  return (
    <UserForm onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        control={control}
        name="fullName"
        placeholder="user name"
        rules={{
          required: '이름을 입력해주세요.',
        }}
        resetField={resetField}
      />
      <FormInput
        control={control}
        name="email"
        placeholder="email"
        rules={{
          required: '이메일을 입력해주세요.',
          pattern: {
            value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: '올바르지 않은 형식입니다.',
          },
        }}
        resetField={resetField}
      />
      <FormInput
        control={control}
        name="password"
        placeholder="password"
        type="password"
        rules={{
          required: '비밀번호를 입력해주세요.',
        }}
        resetField={resetField}
        icon="lock"
      />
      <FormInput
        control={control}
        name="confirmPassword"
        placeholder="password check"
        type="password"
        rules={{
          required: '비밀번호를 입력해주세요.',
          validate: (value) =>
            value === watch('password') || '비밀번호가 일치하지 않습니다.',
        }}
        resetField={resetField}
        icon="lock"
      />
      {errorMessage && (
        <ErrorMessage style={{ textAlign: 'center' }}>
          {errorMessage}
        </ErrorMessage>
      )}
      <FormButton
        type="submit"
        style={{ marginTop: 32 }}
        isSubmitting={isSubmitting}
        isValid={isValid}
      >
        SIGN UP
      </FormButton>
    </UserForm>
  );
};

export default SignUpForm;
