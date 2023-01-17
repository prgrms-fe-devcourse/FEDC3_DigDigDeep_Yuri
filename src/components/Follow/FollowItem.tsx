import { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FollowResponse, UserResponse } from '../../types/response';
import { unfollow } from '../../utils/api/follow';
import { getUserInfo } from '../../utils/api/user';

interface FollowItemProps {
  follow: FollowResponse;
  type: 'following' | 'followers';
  onUnfollow: () => any;
}

const FollowItem = ({ follow, type, onUnfollow }: FollowItemProps) => {
  const { userId } = useParams() as { userId: string };
  const [user, setUser] = useState<UserResponse>();

  const fetchUser = useCallback(async () => {
    const userId = type === 'following' ? follow.user : follow.follower;
    const user = await getUserInfo(userId);
    setUser(user);
  }, [follow, type]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const onClick = async () => {
    if (user?._id === follow.user) await unfollow({ followId: follow._id });
    await onUnfollow();
  };

  const isUnfollowable = () => {
    return userId === 'me' && type === 'following';
  };

  const render = () => {
    if (!user) return null;
    return (
      <StyledListItem>
        <h4>
          <Link to={`/profile/${user._id}`}>
            {user.fullName} | {user._id}
          </Link>
          {isUnfollowable() && <Button onClick={onClick}>X</Button>}
        </h4>
      </StyledListItem>
    );
  };

  return <>{render()}</>;
};

export default FollowItem;

const StyledListItem = styled.li`
  margin: 3rem;
`;

const Button = styled.button`
  padding: 1rem;
  background-color: red;
  cursor: pointer;
`;
