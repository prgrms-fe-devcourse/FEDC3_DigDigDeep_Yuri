import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms/user';
import { useEffect, useState, useCallback } from 'react';
import { follow, unfollow } from '../../utils/api/follow';
import useGetMyInfo from '../../hooks/useGetMyInfo';

interface FollowButtonProps {
  targetId: string;
  fetchUser: (...any: any[]) => any;
}

const FollowButton = ({ targetId, fetchUser }: FollowButtonProps) => {
  const user = useRecoilValue(userState);

  const [isFollowable, setIsFollowable] = useState(false);

  const checkMyFollow = useCallback(() => {
    return user.following.find((follow) => follow.user === targetId);
  }, [targetId, user.following]);

  const getMyInfo = useGetMyInfo();

  useEffect(() => {
    const follow = checkMyFollow();
    if (follow) {
      setIsFollowable(false);
    } else {
      setIsFollowable(true);
    }
  }, [checkMyFollow]);

  const handleOnClick = async () => {
    if (isFollowable) {
      await followUser();
    } else {
      await unFollowUser();
    }
    getMyInfo();
    fetchUser();
  };

  const followUser = async () => {
    await follow({ userId: targetId });
  };

  const unFollowUser = async () => {
    const { _id } = checkMyFollow() || {};
    if (!_id) return;
    await unfollow({ followId: _id });
  };

  return (
    <>
      {targetId === 'me' ? null : (
        <Button onClick={handleOnClick}>
          {isFollowable ? 'FOLLOW' : 'UNFOLLOW'}
        </Button>
      )}
    </>
  );
};

export default FollowButton;

const Button = styled.button``;
