import styled from 'styled-components';
import ProfileEditForm from '../components/Profile/ProfileEditForm';

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
  width: 50%;
  min-width: calc(767px - 10%);
  height: 100vh;
  box-sizing: border-box;
  text-align: center;
  margin: 0 auto;
  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 90%;
    min-width: 90%;
  }
`;
