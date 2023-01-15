import Icon from './Base/Icon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOR } from '../utils/color';
interface Props {
  title: string;
  isButton: boolean;
  buttonText?: string;
}

const DetailHeader = ({ title, isButton, buttonText }: Props) => {
  return (
    <Container>
      <BackHomeLink to="/">
        <Icon name="back" size={16} />
      </BackHomeLink>
      <Title>{title}</Title>
      {isButton && <Button>{buttonText}</Button>}
    </Container>
  );
};

export default DetailHeader;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  padding: 3rem 0;
  width: 50%;
  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 86%;
    padding: 2.4rem 0;
  }
`;

const BackHomeLink = styled(Link)`
  font-size: 1.6rem;
`;

const Title = styled.h3`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.9rem;
  letter-spacing: -0.01em;
  color: ${COLOR.text};
  justify-self: center;
`;

const Button = styled.button``;
