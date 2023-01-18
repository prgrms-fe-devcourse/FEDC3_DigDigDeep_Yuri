import { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import useNotification from '../../hooks/useNotification';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/user';
import { COLOR } from '../../utils/color';
import { seenNotification } from '../../utils/notification';

const NotificationList = () => {
  const [user] = useRecoilState(userState);
  const { notifications } = useNotification();

  const fetchSeenNotifications = useCallback(async () => {
    try {
      await seenNotification();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchSeenNotifications();
  }, [fetchSeenNotifications]);

  return (
    <List>
      {notifications.length === 0 ? (
        <Text>아무 알림도 오지 않았어요 ... 🦔</Text>
      ) : (
        notifications
          .filter((notification) => notification.author._id !== user._id)
          .map((notification) => (
            <Notification key={notification._id} {...notification} />
          ))
      )}
    </List>
  );
};

export default NotificationList;

const List = styled.ul`
  width: 50%;
  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 86%;
  }
`;

const Text = styled.h3`
  margin-top: 4rem;
  font-weight: 400;
  font-size: 1.5rem;
  text-align: center;
  color: ${COLOR.lightBrown};
`;
