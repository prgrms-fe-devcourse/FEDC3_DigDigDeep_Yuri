import styled from 'styled-components';
import LoginForm from '../components/Login/LoginForm';
import { COLOR } from '../utils/color';

const LoginPage = () => {
  return (
    <Background>
      <Container>
        <ImageWrapper>
          <Image src="/image/logo/big.png" alt="logo" />
        </ImageWrapper>
        <Divider />
        <FormWrapper>
          <TextWrapper>
            <H1>Welcome!</H1>
            <Text>Let's dig dig deep</Text>
          </TextWrapper>
          <LoginForm />
        </FormWrapper>
      </Container>
    </Background>
  );
};

export default LoginPage;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${COLOR.brownGray};
  padding: 5rem 8rem;
  box-sizing: border-box;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    padding: 0;
  }
`;

const Container = styled.div`
  border-radius: 57px;
  background-color: ${COLOR.bgColor};
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-around;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    display: flex;
    justify-content: start;
    padding: 0 1.6rem;
    box-sizing: border-box;
    flex-direction: column;
    gap: 5rem;
    border-radius: 0;
  }
`;

const ImageWrapper = styled.div`
  text-align: center;
  width: 25%;
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1200px) {
    width: 40%;
  }

  @media screen and (max-width: 767px) and (orientation: portrait) {
    margin-top: 8rem;
    background-color: inherit;
    flex-direction: column;
    gap: 5rem;
    width: 100%;
    padding: 0 6rem;
  }
`;

const Divider = styled.hr`
  background-color: ${COLOR.lightGray};
  position: absolute;
  display: inline-block;
  width: 1px;
  height: 50rem;
  vertical-align: middle;
  border: none;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 767px) and (orientation: portrait) {
    display: none;
  }
`;

const Image = styled.img`
  height: min-content;
  /* width: min-content; */
  max-width: 100%;
  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 100%;
  }
`;

const TextWrapper = styled.div`
  display: block;
  @media screen and (max-width: 767px) and (orientation: portrait) {
    display: none;
  }
`;

const H1 = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 4.8rem;
  line-height: 5.8rem;
  letter-spacing: -0.01em;

  color: ${COLOR.text};
`;

const Text = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 3rem;
  line-height: 3.6rem;
  letter-spacing: -0.01em;

  color: ${COLOR.lightBrown};
  margin-bottom: 5rem;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25%;
  @media screen and (max-width: 1200px) {
    width: 40%;
  }
  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 100%;
  }
`;
