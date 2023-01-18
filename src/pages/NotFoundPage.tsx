import styled from 'styled-components';
import { COLOR } from '../utils/color';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Image src="/image/icon/404.png" />
      <Title>찾을 수 없는 페이지입니다.</Title>
      <Detail>요청하신 페이지가 사라졌거나, 잘못된 경로입니다...</Detail>
      <Button onClick={() => navigate('/')}>홈으로 이동</Button>
      <Background src="/image/icon/ground.png" />
    </Container>
  );
};
export default NotFoundPage;

const Container = styled.div`
  height: 100vh;
  background-color: #9dd0ff;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 20vw;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 50vw;
  }
`;

const Title = styled.h1`
  color: ${COLOR.white};
  font-weight: 600;
  font-size: 3rem;
  margin: 5rem 0 1.7rem;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    margin: 3rem 0 1rem;
    font-size: 2.2rem;
  }
`;

const Detail = styled.h2`
  color: ${COLOR.white};
  font-weight: 400;
  font-size: 2rem;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    font-size: 1.4rem;
  }
`;

const Button = styled.button`
  border-radius: 23.5px;
  border: 4px solid ${COLOR.white};
  color: ${COLOR.white};
  padding: 0.8rem 4rem;
  font-weight: 600;
  font-size: 1.6rem;
  margin-top: 5rem;
`;

const Background = styled.img`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: -2.8rem;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    bottom: 0;
  }
`;
