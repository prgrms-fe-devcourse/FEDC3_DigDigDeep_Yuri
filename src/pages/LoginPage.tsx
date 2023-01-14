import styled from 'styled-components';
import LoginForm from '../components/Login/LoginForm';

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <ImageWrapper>
        <Image src="/image/logo/big.png" alt="logo" />
      </ImageWrapper>
      <LoginForm />
    </LoginPageContainer>
  );
};

export default LoginPage;

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  width: 100%;
  height: 100vh;
  padding: 0 1.6rem;
  box-sizing: border-box;
`;

const ImageWrapper = styled.div`
  margin-top: 8rem;
  text-align: center;
`;

const Image = styled.img``;
