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
import COLORS from '../../utils/colors';
import ErrorMessage from '../UserForm/ErrorMessage';
import { ROUTES } from '../../utils/routes';
import { ERROR_MESSAGES } from '../../utils/messages';
import useToast from '../../hooks/useToast';
import { loadingState } from '../../recoil/atoms/loading';
import { LOGIN_RULES } from '../../utils/formRules';
import { FORM_RULE_MESSAGE } from '../../utils/messages';

const RESPONSE_ERROR_MESSAGE =
  'Your email and password combination does not match an account.';

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const setUser = useSetRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);
  const setLoading = useSetRecoilState(loadingState);
  const { showToast } = useToast();

  const {
    handleSubmit,
    resetField,
    control,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      const { user, token } = await login(data);
      setLoading(false);
      setErrorMessage('');
      setUser(user);
      setToken(token);
    } catch (error) {
      setLoading(false);
      console.error(error);
      if (error instanceof AxiosError && error.response?.data) {
        if (error.response.data === RESPONSE_ERROR_MESSAGE) {
          setErrorMessage(FORM_RULE_MESSAGE.INCORRECT_LOGIN_INFO);
        }
      } else {
        showToast({ message: ERROR_MESSAGES.SERVER_ERROR });
      }
    }
  };

  return (
    <UserForm onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        control={control}
        name="email"
        placeholder="email"
        rules={LOGIN_RULES.email}
        resetField={resetField}
      />
      <FormInput
        control={control}
        name="password"
        placeholder="password"
        type="password"
        rules={LOGIN_RULES.password}
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

  color: ${COLORS.text};
`;

const SignUpLink = styled(Link)`
  font-size: 1.6rem;
  margin-left: 1rem;
  color: ${COLORS.green};
  text-decoration: underline;
`;
