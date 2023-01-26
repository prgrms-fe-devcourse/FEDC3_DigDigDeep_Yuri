import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { FollowResponse, UserResponse } from '../../types/response';
import { getUser } from '../../utils/api/user';
import UserItem from '../User/UserItem';
import useToast from '../../hooks/useToast';
import { COLOR } from '../../utils/color';
import Spinner from '../Base/Spinner';
import { ERROR_MESSAGES } from '../../utils/messages';

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
          message: ERROR_MESSAGES.GET_ERROR('사용자 정보'),
        });
      });
  }, [follows, showToast, type]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      {users.length === 0 ? (
        <Text>
          아직 {type === 'following' ? '팔로잉' : '팔로워'} 목록이 없습니다.
        </Text>
      ) : (
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
          <Spinner loading={loading} />{' '}
        </>
      )}
    </>
  );
};

export default FollowList;

const Text = styled.h3`
  margin-top: 4rem;
  font-weight: 400;
  font-size: 1.5rem;
  text-align: center;
  color: ${COLOR.brownGray};
`;

const List = styled.ul`
  width: 100%;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 90%;
  }
`;

const UserListItem = styled.div`
  padding: 1.4rem;
  border-bottom: 0.3px solid ${COLOR.lightGray};
`;
