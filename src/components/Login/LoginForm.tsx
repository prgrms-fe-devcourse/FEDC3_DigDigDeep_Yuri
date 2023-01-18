import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { tokenState, userState } from '../../recoil/atoms/user';
import { login } from '../../utils/api/user';
import { AxiosError } from 'axios';
import FormInput from '../UserForm/FormInput';
import UserForm from '../UserForm/UserForm';
import FormButton from '../UserForm/FormButton';
import { useState } from 'react';
import styled from 'styled-components';
import Divider from '../Base/Divider';
import { Link } from 'react-router-dom';
import { COLOR } from '../../utils/color';
import ErrorMessage from '../UserForm/ErrorMessage';
import { ROUTES } from '../../utils/routes';

const RESPONSE_ERROR_MESSAGE =
  'Your email and password combination does not match an account.';

const LoginForm = () => {
  const setUser = useSetRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);

  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    resetField,
    control,
    formState: { isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const { user, token } = await login(data);
      setErrorMessage('');
      setUser(user);
      setToken(token);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response?.data) {
        if (error.response.data === RESPONSE_ERROR_MESSAGE) {
          setErrorMessage(
            '이메일 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'
          );
        }
      } else {
        setErrorMessage('서버와 통신 중 문제가 발생했습니다.');
      }
    }
  };

  return (
    <UserForm onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        control={control}
        name="email"
        placeholder="email"
        rules={{
          required: '이메일을 입력해주세요.',
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
        LOG IN
      </FormButton>
      <Divider type="horizontal" size={24} style={{ width: '70%' }} />
      <SignUpLinkWrapper>
        아직 회원이 아니신가요?
        <SignUpLink to={ROUTES.SIGNUP}>SIGN UP</SignUpLink>
      </SignUpLinkWrapper>
    </UserForm>
  );
};

export default LoginForm;

const SignUpLinkWrapper = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.01em;

  color: ${COLOR.text};
`;

const SignUpLink = styled(Link)`
  font-size: 1.6rem;
  margin-left: 1rem;
  color: ${COLOR.green};
  text-decoration: none;
`;
