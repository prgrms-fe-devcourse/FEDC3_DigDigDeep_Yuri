import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FollowResponse, UserResponse } from '../../types/response';
import { unfollow } from '../../utils/api/follow';

interface UserItemProps {
  user: UserResponse;
  type?: 'following' | 'followers';
  follow?: FollowResponse;
  onUnfollow?: () => any;
}

const User = ({ user, type, follow, onUnfollow }: UserItemProps) => {
  const { userId } = useParams() as { userId: string };

  const onClick = async () => {
    console.log(user);
    console.log(follow);
    if (!user || !follow) return;
    // if (user?._id === follow.user) await unfollow({ followId: follow._id });
    await unfollow({ followId: follow._id });
    onUnfollow && (await onUnfollow());
  };

  const isUnfollowable = () => {
    return userId === 'me' && type === 'following';
  };

  const render = () => {
    if (!user) return null;
    return (
      <Container>
        <h4>
          <Link to={`/profile/${user._id}`}>
            {user.fullName} | {user._id}
          </Link>
          {isUnfollowable() && <Button onClick={onClick}>X</Button>}
          {/* <Button onClick={onClick}>X</Button> */}
        </h4>
      </Container>
    );
  };

  return <>{render()}</>;
};

export default User;

const Container = styled.div`
  margin: 3rem;
`;

const Button = styled.button`
  padding: 1rem;
  background-color: red;
  cursor: pointer;
`;
