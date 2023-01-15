import styled from 'styled-components';
import { COLOR } from '../utils/color';

const PostEdit = () => {
  return (
    <Container>
      <Title></Title>
      <Body></Body>
    </Container>
  );
};

export default PostEdit;

const Container = styled.div`
  width: 50%;
  height: 90vh;
  background: ${COLOR.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  box-shadow: 0px -1px 4px rgba(210, 210, 210, 0.25);
  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    gap: 1rem;
  }
`;

const Title = styled.textarea`
  width: 90%;
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 2.7rem;
  line-height: 3.5rem;
  letter-spacing: -0.01em;
  color: ${COLOR.brown};
  margin-top: 3rem;
  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 86%;
    font-size: 2.2rem;
    margin-top: 2rem;
  }
`;

const Body = styled.textarea`
  width: 90%;
  height: 100%;
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 2.3rem;
  letter-spacing: -0.01em;
  color: ${COLOR.brown};
  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 86%;
    font-size: 1.6rem;
  }
`;
