import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FollowResponse, UserResponse } from '../../types/response';
import { unfollow } from '../../utils/api/follow';
import { COLOR } from '../../utils/color';
import Icon from '../Base/Icon';
import useGetMyInfo from '../../hooks/useGetMyInfo';
import Image from '../Base/Image';

interface UserItemProps {
  user: UserResponse;
  type?: 'following' | 'followers';
  follow?: FollowResponse;
  onUnfollow?: () => any;
}

const UserItem = ({ user, type, follow, onUnfollow }: UserItemProps) => {
  const { userId } = useParams() as { userId: string };
  const navigate = useNavigate();

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
    navigate(`/profile/${user._id}`);
  };

  const render = () => {
    if (!user) return null;
    return (
      <Container onClick={onContainerClick}>
        <ImageWrapper>
          <Image
            src={user.image ? user.image : '/image/default-profile.png'}
            alt="user-profile"
          />
        </ImageWrapper>
        <Text>{user.fullName}</Text>
        {isUnfollowable() && (
          <Button onClick={onClickUnfollow} type="button">
            <Icon name="close" />
          </Button>
        )}
      </Container>
    );
  };

  return <>{render()}</>;
};

export default UserItem;

const Container = styled.div`
  padding: 1rem 2rem;
  display: flex;
  gap: 2.2rem;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
  color: ${COLOR.text};
`;

const Button = styled.button`
  margin-left: auto;
  cursor: pointer;
`;
