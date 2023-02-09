import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { getUser } from '../../utils/api/user';
import UserItem from '../User/UserItem';
import useToast from '../../hooks/useToast';
import COLORS from '../../utils/colors';
import Spinner from '../Base/Spinner';
import { ERROR_MESSAGES } from '../../utils/messages';
import type { UserResponse } from '../../types/api/user';
import type { FollowResponse } from '../../types/api/follow';

interface BasicFollow {
  follows: FollowResponse[];
  onUnfollow: () => unknown;
}

interface Following extends BasicFollow {
  type: 'following';
}

interface Followers extends BasicFollow {
  type: 'followers';
}

const FollowList = ({ type, follows, onUnfollow }: Following | Followers) => {
  const { showToast } = useToast();

  const [users, setUsers] = useState<UserResponse[]>([]);

  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    Promise.allSettled(
      follows.map((follow) => {
        const userId = type === 'following' ? follow.user : follow.follower;
        return getUser(userId);
      })
    )
      .then((results) => {
        const users = results.map((result) => {
          if (result.status !== 'fulfilled' || !result.value)
            throw new Error('');

          return result.value;
        });
        setLoading(false);
        setUsers(users);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        showToast({
          message: ERROR_MESSAGES.GET_ERROR('사용자 정보'),
        });
      });
  }, [follows, showToast, type]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <List>
        {users.map((user, index) => (
          <UserListItem key={user._id}>
            <UserItem
              type={type}
              user={user}
              onUnfollow={onUnfollow}
              follow={follows[index]}
            />
          </UserListItem>
        ))}
      </List>
      <Spinner loading={loading} />
    </>
  );
};

export default FollowList;

const List = styled.ul`
  width: 100%;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 90%;
  }
`;

const UserListItem = styled.div`
  padding: 1.4rem;
  border-bottom: 0.3px solid ${COLORS.lightGray};
`;
