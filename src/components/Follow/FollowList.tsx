import styled from 'styled-components';
import { FollowResponse } from '../../types/response';
import FollowItem from './FollowItem';

interface Following {
  type: 'following';
  follows: FollowResponse[];
}

interface Followers {
  type: 'followers';
  follows: FollowResponse[];
}

const FollowList = ({ type, follows }: Following | Followers) => {
  return (
    <List>
      {follows.map((follow) => (
        <FollowItem key={follow._id} type={type} follow={follow} />
      ))}
    </List>
  );
};

export default FollowList;

const List = styled.ul`
  margin-top: 1px;
  background-color: #ddd;
`;
