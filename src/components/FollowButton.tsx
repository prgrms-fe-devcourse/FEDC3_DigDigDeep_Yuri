import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userState } from '../recoil/atoms/user';
import { COLOR } from '../utils/color';
import { createFollow, deleteFollow } from '../utils/follow';

const FollowButton = () => {
  const { userId } = useParams();
  const [user, setUser] = useRecoilState(userState);
  const { following } = user;
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [followId, setFollowId] = useState('');

  const handleFollow = async () => {
    if (!user) {
      alert('로그인 후 이용해 주세요!');
      return;
    }

    try {
      if (!isFollowing) {
        setIsFollowing(true);
        const { data } = await createFollow(userId as string);
        setUser({
          ...user,
          following: [...user.following, data],
        });
      } else {
        setIsFollowing(false);
        deleteFollow(followId);
        setUser({
          ...user,
          following: user.following.filter((item) => item.user !== userId),
        });
      }
    } catch (err) {
      alert('팔로잉 처리 중 에러가 발생했습니다.');
      console.error(err);
    }
  };

  useEffect(() => {
    const isFollowing = following.find((item) => item.user === userId);
    if (isFollowing) {
      setIsFollowing(true);
      setFollowId(isFollowing._id);
    }
  }, [following, userId]);

  return (
    <StyledButton onClick={handleFollow}>
      {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
    </StyledButton>
  );
};

export default FollowButton;

const StyledButton = styled.button`
  cursor: pointer;
  background-color: ${COLOR.orange};
`;
