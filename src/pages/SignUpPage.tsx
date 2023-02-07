import styled from 'styled-components';
import SignUpForm from '../components/SIgnUp/SignUpForm';
import COLORS from '../utils/colors';

const bigLogo = require('../assets/images/logo/big.png');

const SignUpPage = () => {
  return (
    <Background>
      <Container>
        <ImageWrapper>
          <Image src={bigLogo} alt="logo" />
        </ImageWrapper>
        <Divider />
        <FormWrapper>
          <Text>Create your account!</Text>
          <SignUpForm />
        </FormWrapper>
      </Container>
    </Background>
  );
};

export default SignUpPage;

const Text = styled.span`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.9rem;
  letter-spacing: -0.01em;
  color: ${COLORS.text};
  display: block;
  margin-bottom: 2rem;
  padding: 0 0.8rem;
`;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${COLORS.brownGray};
  padding: 5rem 8rem;
  box-sizing: border-box;

  @media screen and (max-width: 767px) {
    padding: 0;
  }

  @media screen and (max-height: 767px) and (orientation: landscape) {
    height: 767px;
    overflow: hidden;
  }
`;

const Container = styled.div`
  border-radius: 57px;
  background-color: ${COLORS.bgColor};
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

  @media screen and (max-width: 767px) {
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
  background-color: ${COLORS.lightGray};
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

  @media screen and (max-height: 767px) and (orientation: landscape) {
    height: 383.5px;
    position: fixed;
    top: 383.5px;
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
