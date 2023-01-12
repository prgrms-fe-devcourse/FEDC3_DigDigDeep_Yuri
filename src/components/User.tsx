import { UserResponse } from '../types/response';

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
      <button>Go To Profile</button>
      {unfollowable && <button>unfollow</button>}
    </li>
  );
};

export default User;
