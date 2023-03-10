import styled from 'styled-components';
import Icon from '../Base/Icon';
import COLORS from '../../utils/colors';
import Image from '../Base/Image';
import type { NotificationResponse } from '../../types/api/notification';

const Notification = ({
  author,
  like,
  follow,
  comment,
}: NotificationResponse) => {
  return (
    <>
      {like || follow || comment ? (
        <ListItem>
          {author.image ? (
            <ImageContainer>
              <Image src={author.image} alt={author.fullName} />
            </ImageContainer>
          ) : (
            <Icon name="default-profile" size={38} />
          )}
          <Text>
            <Strong>{author.fullName}</Strong>님이{` `}
            {like && `내 그라운드를 좋아합니다.`}
            {follow && `나를 팔로우했습니다.`}
            {comment && `내 그라운드를 디깅했습니다.`}
          </Text>
        </ListItem>
      ) : null}
    </>
  );
};

export default Notification;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1.8rem;
  padding: 1.4rem;
  border-bottom: 0.3px solid ${COLORS.lightGray};
`;

const ImageContainer = styled.div`
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 50%;
`;

const Text = styled.span`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.01em;
  color: ${COLORS.text};
`;

const Strong = styled.strong`
  font-weight: 700;
`;
