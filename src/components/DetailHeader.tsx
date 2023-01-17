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
        <Icon name="back" width={20} height={16} />
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
  padding: 2rem 0;
  width: 50%;
  min-width: 767px;
  align-items: center;
  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 86%;
    padding: 1.7rem 0;
    min-width: 86%;
  }
`;

const BackHomeLink = styled(Link)`
  font-size: 1.6rem;
`;

const Title = styled.h3`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.9rem;
  letter-spacing: -0.01em;
  color: ${COLOR.text};
  justify-self: center;
  width: max-content;
`;

const Button = styled.button`
  background: ${COLOR.green};
  border-radius: 23.5px;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: -0.01em;
  color: ${COLOR.white};
  padding: 1.1rem 2.2rem;
  width: fit-content;
  justify-self: right;
`;
