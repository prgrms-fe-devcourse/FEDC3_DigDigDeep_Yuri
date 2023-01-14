import styled from 'styled-components';
import Icon from './Base/Icon';
import { COLOR } from '../utils/color';

const NotificationList = () => {
  return (
    <>
      <List>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>백엔드 개발자</Strong>님이 나를 팔로우했습니다.
          </Text>
        </ListItem>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>프론트엔드 개발자하고싶다</Strong>님이 내 그라운드를
            디깅했습니다.
          </Text>
        </ListItem>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>백엔드 개발자</Strong>님이 나를 팔로우했습니다.
          </Text>
        </ListItem>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>백엔드 개발자</Strong>님이 나를 팔로우했습니다.
          </Text>
        </ListItem>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>프론트엔드 개발자하고싶다</Strong>님이 내 그라운드를
            디깅했습니다.
          </Text>
        </ListItem>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>백엔드 개발자</Strong>님이 나를 팔로우했습니다.
          </Text>
        </ListItem>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>백엔드 개발자</Strong>님이 나를 팔로우했습니다.
          </Text>
        </ListItem>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>프론트엔드 개발자하고싶다</Strong>님이 내 그라운드를
            디깅했습니다.
          </Text>
        </ListItem>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>백엔드 개발자</Strong>님이 나를 팔로우했습니다.
          </Text>
        </ListItem>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>백엔드 개발자</Strong>님이 나를 팔로우했습니다.
          </Text>
        </ListItem>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>프론트엔드 개발자하고싶다</Strong>님이 내 그라운드를
            디깅했습니다.
          </Text>
        </ListItem>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>백엔드 개발자</Strong>님이 나를 팔로우했습니다.
          </Text>
        </ListItem>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>백엔드 개발자</Strong>님이 나를 팔로우했습니다.
          </Text>
        </ListItem>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>프론트엔드 개발자하고싶다</Strong>님이 내 그라운드를
            디깅했습니다.
          </Text>
        </ListItem>
        <ListItem>
          <Icon name="profile-image" size={38} />
          <Text>
            <Strong>백엔드 개발자</Strong>님이 나를 팔로우했습니다.
          </Text>
        </ListItem>
      </List>
    </>
  );
};

export default NotificationList;

const List = styled.ul`
  width: 50%;
  margin: 0 auto;
  g @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 86%;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1.8rem;
  padding: 1.4rem;
  border-bottom: 0.3px solid ${COLOR.lightGray};
`;

const Text = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-weight: 350;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.01em;
  color: #715141;
`;

const Strong = styled.strong`
  font-weight: 700;
`;
