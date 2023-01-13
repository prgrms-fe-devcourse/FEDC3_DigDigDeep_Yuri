import { UserResponse } from '../types/response';
import User from './User';

interface Props {
  users: UserResponse[];
  unfollowable: boolean;
}

const UserList = ({ users, unfollowable }: Props) => {
  return (
    <ul>
      {users.map((userInfo) => (
        <User
          key={userInfo._id}
          userInfo={userInfo}
          unfollowable={unfollowable}
        />
      ))}
    </ul>
  );
};

export default UserList;
