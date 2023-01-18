import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
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

const ProfileEditForm = () => {
  const navigate = useNavigate();

  const getMyInfo = useGetMyInfo();

  const user = useRecoilValue(userState);

  const { showToast } = useToast();

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

    if (promises.length === 0) return;

    Promise.all(promises)
      .then(() => {
        getMyInfo();
        showToast({ message: '변경되었습니다.' });
        navigate(ROUTES.PROFILE_ME);
      })
      .catch((error) => {
        console.error(error);
        showToast({ message: '서버와 통신 중 문제가 발생했습니다.' });
      });
  };

  return (
    <UserForm onSubmit={handleSubmit(onSubmit)}>
      <FormImageFile control={control} name="image" src={user.image} />
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
        disabled={true}
      />
      <FormInput
        control={control}
        name="password"
        placeholder="password"
        type="password"
        resetField={resetField}
        icon="lock"
      />
      <FormInput
        control={control}
        name="confirmPassword"
        placeholder="password check"
        type="password"
        rules={{
          validate: (value) =>
            value === watch('password') || '비밀번호가 일치하지 않습니다.',
        }}
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
