import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userState } from '../../recoil/atoms/user';
import { unfollow } from '../../utils/api/follow';
import COLORS from '../../utils/colors';
import Icon from '../Base/Icon';
import useGetMyInfo from '../../hooks/useGetMyInfo';
import Image from '../Base/Image';
import { queryLowImage } from '../../utils/image';
import type { UserResponse } from '../../types/api/user';
import type { FollowResponse } from '../../types/api/follow';

const defaultProfile = require('../../assets/images/icon/default-profile.png');

interface UserItemProps {
  user: UserResponse;
  type?: 'following' | 'followers';
  follow?: FollowResponse;
  onUnfollow?: () => unknown;
}

const UserItem = ({ user, type, follow, onUnfollow }: UserItemProps) => {
  const { userId } = useParams() as { userId: string };
  const navigate = useNavigate();
  const myUser = useRecoilValue(userState);

  const getMyInfo = useGetMyInfo();

  const onClickUnfollow = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (!user || !follow) return;
    await unfollow({ followId: follow._id });
    await getMyInfo();
    onUnfollow && (await onUnfollow());
  };

  const isUnfollowable = () => {
    return userId === 'me' && type === 'following';
  };

  const onContainerClick = () => {
    navigate(`/profile/${user._id === myUser._id ? 'me' : user._id}`);
  };

  const render = () => {
    if (!user) return null;
    return (
      <Container onClick={onContainerClick}>
        <ImageWrapper>
          <Image
            src={
              user.image ? queryLowImage(user.image, 'profile') : defaultProfile
            }
            alt="user-profile"
          />
        </ImageWrapper>
        <Text>{user.fullName}</Text>
        {isUnfollowable() && (
          <Button onClick={onClickUnfollow} type="button">
            <Icon name="close" size={13} />
          </Button>
        )}
      </Container>
    );
  };

  return <>{render()}</>;
};

export default UserItem;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 50%;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.01em;
  color: ${COLORS.text};
`;

const Button = styled.button`
  margin-left: auto;
  cursor: pointer;
`;
