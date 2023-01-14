import styled from 'styled-components';
import SignUpForm from '../components/SIgnUp/SignUpForm';
import { COLOR } from '../utils/color';

const SignUpPage = () => {
  return (
    <SignUpPageContainer>
      <ImageWrapper>
        <Image src="/image/logo/big.png" alt="logo" />
      </ImageWrapper>
      <StyledText>Create your account!</StyledText>
      <SignUpForm />
    </SignUpPageContainer>
  );
};

export default SignUpPage;

const SignUpPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem;
  box-sizing: border-box;
`;

const ImageWrapper = styled.div`
  margin-top: 8rem;
  margin-bottom: 5rem;
  text-align: center;
`;

const StyledText = styled.span`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.9rem;
  letter-spacing: -0.01em;
  color: ${COLOR.text};
  display: block;
  margin-bottom: 2rem;
  padding: 0 0.8rem;
`;

const Image = styled.img``;
