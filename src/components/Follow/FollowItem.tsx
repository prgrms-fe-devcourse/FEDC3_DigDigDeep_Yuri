import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FollowResponse, UserResponse } from '../../types/response';
import { getUserInfo } from '../../utils/api/user';

interface FollowItemProps {
  follow: FollowResponse;
  type: 'following' | 'followers';
}

const FollowItem = ({ follow, type }: FollowItemProps) => {
  const [user, setUser] = useState<UserResponse>();

  const fetchUser = useCallback(async () => {
    const userId = type === 'following' ? follow.user : follow.follower;
    const user = await getUserInfo(userId);
    setUser(user);
  }, [follow, type]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const render = () => {
    if (!user) return null;
    return (
      <StyledListItem>
        <h4>
          <Link to={`/profile/${user._id}`}>
            {user.fullName} | {user._id}
          </Link>
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
