import { ButtonHTMLAttributes } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userState } from '../recoil/atoms/user';
import { FollowResponse } from '../types/response';
import { COLOR } from '../utils/color';
import { deleteFollow } from '../utils/follow';

interface TUnfollowButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  userId: string;
}

const UnfollowButton = ({ userId }: TUnfollowButton) => {
  const [user, setUser] = useRecoilState(userState);

  const handleUnFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      user.following.map(async (item: FollowResponse) => {
        const { id } = e.currentTarget.dataset;
        console.log(user.following);
        if (id === item.user) {
          deleteFollow(item._id);
          setUser({
            ...user,
            following: user.following.filter((item) => item.user !== userId),
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledButton data-id={userId} onClick={handleUnFollow}>
      UNFOLLOW
    </StyledButton>
  );
};

export default UnfollowButton;

const StyledButton = styled.button`
  cursor: pointer;
  background-color: ${COLOR.brown};
`;
