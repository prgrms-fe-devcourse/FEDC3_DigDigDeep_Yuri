import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { tokenState, userState } from '../../recoil/atoms/user';
import { useEffect, useState, useCallback } from 'react';
import { follow, unfollow } from '../../utils/api/follow';
import useGetMyInfo from '../../hooks/useGetMyInfo';
import useToast from '../../hooks/useToast';
import { COLOR } from '../../utils/color';
import { sendNotification } from '../../utils/api/notification';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../utils/messages';

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
    if (!token) return showToast({ message: ERROR_MESSAGES.REQUIRE_LOGIN });

    try {
      const data = await follow({ userId: targetId });

      if (data) {
        showToast({ message: SUCCESS_MESSAGES.FOLLOW_SUCCESS });
        sendNotification('FOLLOW', data._id, targetId, null);
      } else {
        showToast({ message: ERROR_MESSAGES.SERVER_ERROR });
      }
    } catch (error) {
      console.error(error);
      showToast({ message: ERROR_MESSAGES.SERVER_ERROR });
    }
  };

  const unFollowUser = async () => {
    const { _id } = checkMyFollow() || {};
    if (!_id) return;
    try {
      await unfollow({ followId: _id });
      showToast({ message: SUCCESS_MESSAGES.UNFOLLOW_SUCCESS });
    } catch (error) {
      console.error(error);
      showToast({ message: ERROR_MESSAGES.SERVER_ERROR });
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
  background-color: ${({ isFollowable }) =>
    isFollowable ? COLOR.green : COLOR.lightGray};
  border-radius: 23.5px;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: -0.01em;
  color: ${COLOR.white};
  padding: 1.1rem 1.8rem;
  width: fit-content;
  justify-self: right;
  cursor: pointer;
`;
