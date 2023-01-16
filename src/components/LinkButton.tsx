import { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Base/Icon';

interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to: string;
  name: string;
  width: number;
  height: number;
}

const LinkButton = ({ to, name, width = 16, height = 16 }: LinkButtonProps) => {
  return (
    <Link to={to}>
      <Icon name={name} width={width} height={height} />
    </Link>
  );
};

export default LinkButton;
