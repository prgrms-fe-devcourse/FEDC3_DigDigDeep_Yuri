import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormButton from '../UserForm/FormButton';
import UserForm from '../UserForm/UserForm';
import UserInput from '../UserForm/FormInput';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms/user';
import { updatePassword, updateUserName } from '../../utils/api/user';
import useGetMyInfo from '../../hooks/useGetMyInfo';

const ProfileEditForm = () => {
  const navigate = useNavigate();
  const getMyInfo = useGetMyInfo();
  const user = useRecoilValue(userState);

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
    },
  });

  const onSubmit = async (data: {
    email: string;
    fullName: string;
    password: string;
  }) => {
    console.log('submit data:', data);

    const promises = [];

    if (getValues('fullName') !== user.fullName) {
      promises.push(updateUserName(data));
    }

    if (getValues('password')) {
      promises.push(updatePassword(data));
    }

    if (promises.length === 0) return;

    Promise.all(promises)
      .then((response) => {
        getMyInfo();
        alert('변경되었습니다.');
        navigate('/profile/me');
      })
      .catch((error) => {
        console.error(error);
        alert('서버와 통신 중 문제가 발생했습니다.');
      });
  };

  return (
    <UserForm onSubmit={handleSubmit(onSubmit)}>
      <UserInput
        control={control}
        name="fullName"
        placeholder="user name"
        rules={{
          required: '이름을 입력해주세요.',
        }}
        resetField={resetField}
      />
      <UserInput
        control={control}
        name="email"
        placeholder="email"
        disabled={true}
      />
      <UserInput
        control={control}
        name="password"
        placeholder="password"
        type="password"
        resetField={resetField}
        icon="lock"
      />
      <UserInput
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