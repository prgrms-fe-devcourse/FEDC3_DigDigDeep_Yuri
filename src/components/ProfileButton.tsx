import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLOR } from '../utils/color';

interface TProfileButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  userId: string;
}

const ProfileButton = ({ children, userId }: TProfileButton) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${userId}`);
  };

  return <StyledButton onClick={handleClick}>{children}</StyledButton>;
};

export default ProfileButton;
const StyledButton = styled.button`
  cursor: pointer;
  background-color: ${COLOR.green};
`;
