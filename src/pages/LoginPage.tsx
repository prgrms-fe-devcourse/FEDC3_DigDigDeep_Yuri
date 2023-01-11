import styled from 'styled-components';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <ImageWrapper>
        <img src="/image/logo/big.png" alt="logo" />
      </ImageWrapper>
      <LoginForm />
    </LoginPageContainer>
  );
};

export default LoginPage;

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  margin-top: 127px;
  margin-bottom: 66px;
  text-align: center;
`;
