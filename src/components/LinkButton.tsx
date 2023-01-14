import { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Base/Icon';

interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to: string;
  name: string;
  size: number;
}

const LinkButton = ({ to, name, size = 16 }: LinkButtonProps) => {
  return (
    <Link to={to}>
      <Icon name={name} size={size} />
    </Link>
  );
};

export default LinkButton;
