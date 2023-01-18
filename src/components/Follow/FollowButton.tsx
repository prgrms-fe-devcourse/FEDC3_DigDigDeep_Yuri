import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { tokenState, userState } from '../../recoil/atoms/user';
import { useEffect, useState, useCallback } from 'react';
import { follow, unfollow } from '../../utils/api/follow';
import useGetMyInfo from '../../hooks/useGetMyInfo';
import useToast from '../../hooks/useToast';
import { COLOR } from '../../utils/color';

interface FollowButtonProps {
  targetId: string;
  fetchUser: (...any: any[]) => any;
}

const FollowButton = ({ targetId, fetchUser }: FollowButtonProps) => {
  const user = useRecoilValue(userState);
  const { showToast } = useToast();
  const token = useRecoilValue(tokenState);
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
    if (!token) return showToast({ message: '로그인이 필요합니다.' });

    try {
      await follow({ userId: targetId });
      showToast({ message: '팔로우 했습니다.' });
    } catch (error) {
      console.error(error);
      showToast({ message: '서버와 통신 중 문제가 발생했습니다.' });
    }
  };

  const unFollowUser = async () => {
    const { _id } = checkMyFollow() || {};
    if (!_id) return;
    try {
      await unfollow({ followId: _id });
      showToast({ message: '언팔로우 했습니다.' });
    } catch (error) {
      console.error(error);
      showToast({ message: '서버와 통신 중 문제가 발생했습니다.' });
    }
  };

  return (
    <>
      {targetId === 'me' ? null : (
        <Button onClick={handleOnClick} isFollowable={isFollowable}>
          {isFollowable ? 'FOLLOW' : 'FOLLOWING'}
        </Button>
      )}
    </>
  );
};

export default FollowButton;

const Button = styled.button<{ isFollowable: boolean }>`
  cursor: pointer;
  padding: 1.2rem;
  background-color: ${({ isFollowable }) =>
    isFollowable ? COLOR.green : COLOR.lightGray};
  border-radius: 5rem;
  color: ${COLOR.white};
  font-weight: 500;
  font-size: 1rem;
`;
