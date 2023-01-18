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
  width: 50%;
  min-width: calc(767px - 10%);
  height: 100vh;
  box-sizing: border-box;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 10rem;
  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 90%;
    min-width: 90%;
  }
`;
