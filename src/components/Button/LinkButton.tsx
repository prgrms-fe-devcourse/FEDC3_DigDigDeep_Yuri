import { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOR } from '../../utils/color';
import Image from '../Base/Image';
import Icon from './../Base/Icon';

interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to: string;
  name: string;
  isProfile?: boolean;
  src?: string;
  alt?: string;
  size?: number;
}

const LinkButton = ({
  to,
  name,
  isProfile = false,
  src = '',
  alt = '',
  size = 16,
}: LinkButtonProps) => {
  return (
    <Link to={to}>
      {isProfile ? (
        <Container>
          <Image src={src} alt={alt} />
        </Container>
      ) : (
        <Icon name={name} size={size} />
      )}
    </Link>
  );
};

const Container = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 0.5px solid ${COLOR.lightGray};
`;
export default LinkButton;
