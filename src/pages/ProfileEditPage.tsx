import styled from 'styled-components';
import UploadPhotoButton from '../components/UserForm/UploadPhotoButton';
import ProfileEditForm from '../components/Profile/ProfileEditForm';

const ProfileEditPage = () => {
  return (
    <LoginPageContainer>
      <UploadPhotoButton />
      <ProfileEditForm />
    </LoginPageContainer>
  );
};

export default ProfileEditPage;

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  width: 100%;
  height: 100vh;
  padding: 0 1.6rem;
  box-sizing: border-box;
  text-align: center;
`;
