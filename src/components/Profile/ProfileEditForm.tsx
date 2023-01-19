import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/user';
import {
  updatePassword,
  updateUserName,
  uploadPhoto,
} from '../../utils/api/user';
import UserForm from '../UserForm/UserForm';
import FormButton from '../UserForm/FormButton';
import FormInput from '../UserForm/FormInput';
import useGetMyInfo from '../../hooks/useGetMyInfo';
import useToast from '../../hooks/useToast';
import { ROUTES } from '../../utils/routes';
import FormImageFile from '../UserForm/FormProfileImage';
import { loadingState } from '../../recoil/atoms/loading';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../utils/messages';
import { PROFILE_EDIT_RULES } from '../../utils/formRules';
import { queryLowImage } from '../../utils/image';

const ProfileEditForm = () => {
  const user = useRecoilValue(userState);
  const setLoading = useSetRecoilState(loadingState);
  const getMyInfo = useGetMyInfo();
  const { showToast } = useToast();

  const navigate = useNavigate();
  const {
    handleSubmit,
    resetField,
    watch,
    getValues,
    control,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: user.email,
      fullName: user.fullName,
      password: '',
      confirmPassword: '',
      image: undefined,
    },
  });

  const onSubmit = async (data: {
    email: string;
    fullName: string;
    password: string;
    image?: File;
  }) => {
    const promises = [];

    if (data.image) {
      promises.push(uploadPhoto(data.image));
    }
    if (getValues('fullName') !== user.fullName) {
      promises.push(updateUserName(data));
    }

    if (getValues('password')) {
      promises.push(updatePassword(data));
    }

    if (promises.length === 0) {
      showToast({ message: SUCCESS_MESSAGES.EDIT_SUCCESS('') });
      navigate(ROUTES.PROFILE_ME);
      return;
    }

    setLoading(true);
    Promise.all(promises)
      .then(() => {
        getMyInfo();
        setLoading(false);
        showToast({ message: SUCCESS_MESSAGES.EDIT_SUCCESS('') });
        navigate(ROUTES.PROFILE_ME);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        showToast({ message: ERROR_MESSAGES.SERVER_ERROR });
      });
  };

  return (
    <UserForm onSubmit={handleSubmit(onSubmit)}>
      <FormImageFile
        control={control}
        name="image"
        src={user.image ? queryLowImage(user.image, 'profile') : ''}
      />
      <FormInput
        control={control}
        name="fullName"
        placeholder="nickname"
        rules={PROFILE_EDIT_RULES.nickname}
        resetField={resetField}
      />
      <FormInput
        control={control}
        name="email"
        placeholder="email"
        disabled={true}
      />
      <FormInput
        control={control}
        name="password"
        placeholder="password"
        type="password"
        rules={PROFILE_EDIT_RULES.password}
        resetField={resetField}
        icon="lock"
      />
      <FormInput
        control={control}
        name="confirmPassword"
        placeholder="password check"
        type="password"
        rules={PROFILE_EDIT_RULES.confirmPassword(watch('password'))}
        resetField={resetField}
        icon="lock"
      />
      <FormButton
        type="submit"
        style={{ marginTop: 32 }}
        isSubmitting={isSubmitting}
        isValid={isValid}
      >
        COMPLETE
      </FormButton>
    </UserForm>
  );
};

export default ProfileEditForm;
