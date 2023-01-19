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
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../utils/messages';
import { useSetRecoilState } from 'recoil';
import {
  confirmPasswordRule,
  emailRule,
  nickNameRule,
  passwordRule,
} from '../../utils/formRules';
import { loadingState } from '../../recoil/atoms/loading';

const RESPONSE_ERROR_MESSAGE = 'The email address is already being used.';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const setLoading = useSetRecoilState(loadingState);
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
      setLoading(true);
      await signUp(data);
      setLoading(false);
      setErrorMessage('');
      showToast({ message: SUCCESS_MESSAGES.SIGNUP_SUCCESS });
      navigate(ROUTES.LOGIN);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        if (error.response?.data === RESPONSE_ERROR_MESSAGE) {
          setErrorMessage('이미 사용중인 이메일입니다.');
        }
      } else {
        showToast({ message: ERROR_MESSAGES.SERVER_ERROR });
      }
      setLoading(false);
    }
  };

  return (
    <UserForm onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        control={control}
        name="fullName"
        placeholder="nickname"
        rules={nickNameRule}
        resetField={resetField}
      />
      <FormInput
        control={control}
        name="email"
        placeholder="email"
        rules={emailRule}
        resetField={resetField}
      />
      <FormInput
        control={control}
        name="password"
        placeholder="password"
        type="password"
        rules={passwordRule}
        resetField={resetField}
        icon="lock"
      />
      <FormInput
        control={control}
        name="confirmPassword"
        placeholder="password check"
        type="password"
        rules={confirmPasswordRule(watch('password'))}
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
