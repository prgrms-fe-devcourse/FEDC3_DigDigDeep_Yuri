import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userState } from '../recoil/atoms/user';
import { COLOR } from '../utils/color';

interface TProfileButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  userId: string;
}
const ProfileButton = ({ children, userId }: TProfileButton) => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const handleClick = () => {
    const id = userId === user._id ? 'me' : userId;
    navigate(`/profile/${id}`);
  };

  return <StyledButton onClick={handleClick}>{children}</StyledButton>;
};

export default ProfileButton;

const StyledButton = styled.button`
  cursor: pointer;
  background-color: ${COLOR.green};
`;
