import styled from 'styled-components';
import DetailHeader from '../components/Header/DetailHeader';
import Header from '../components/Header/Header';
import ProfileEditForm from '../components/Profile/ProfileEditForm';

const ProfileEditPage = () => {
  return (
    <>
      <Header />
      <LoginPageContainer>
        <DetailHeader isButton={false} />
        <ProfileEditForm />
      </LoginPageContainer>
    </>
  );
};

export default ProfileEditPage;

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  min-width: 35rem;
  height: 100vh;
  box-sizing: border-box;
  text-align: center;
  margin: 0 auto;
  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 90%;
    min-width: 0;
  }
`;
