import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { FollowResponse, UserResponse } from '../../types/response';
import { getUser } from '../../utils/api/user';
import UserItem from '../User/UserItem';
import useToast from '../../hooks/useToast';
import { COLOR } from '../../utils/color';
import Spinner from '../Base/Spinner';

interface BasicFollow {
  follows: FollowResponse[];
  onUnfollow: () => any;
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
          message: '유저 정보를 가져오던 중 문제가 발생했습니다.',
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
          <UserListItem>
            <UserItem
              key={user._id}
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
`;

const UserListItem = styled.div`
  padding: 1.4rem;
  border-bottom: 0.3px solid ${COLOR.lightGray};
`;
