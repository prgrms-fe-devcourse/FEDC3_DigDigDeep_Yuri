import styled from 'styled-components';
import { FollowResponse } from '../../types/response';
import FollowItem from './FollowItem';

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
  return (
    <List>
      {follows.map((follow) => (
        <FollowItem
          key={follow._id}
          type={type}
          follow={follow}
          onUnfollow={onUnfollow}
        />
      ))}
    </List>
  );
};

export default FollowList;

const List = styled.ul`
  margin-top: 1px;
  background-color: #ddd;
`;
