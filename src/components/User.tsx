import { UserResponse } from '../types/response';
import ProfileButton from './ProfileButton';
import UnfollowButton from './UnfollowButton';

const User = ({
  userInfo,
  unfollowable,
  ...props
}: {
  userInfo: UserResponse;
  unfollowable: boolean;
}) => {
  return (
    <li {...props}>
      <img src={userInfo.image} alt={userInfo.fullName} />
      <h3>{userInfo.fullName}</h3>
      <ProfileButton userId={userInfo._id}>PROFILE</ProfileButton>
      {unfollowable && <UnfollowButton userId={userInfo._id} />}
    </li>
  );
};

export default User;

// 1. 내 팔로잉 목록을 바탕으로 각 사람의 팔로잉 배열을 받는다.
// 2. 그 배열을 Props로 넘겨서 전달한다.
// 3.
