import styled from 'styled-components';
import ProfileEditForm from '../components/ProfileEditForm';

const ProfileEditPage = () => {
  return (
    <LoginPageContainer>
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
`;
