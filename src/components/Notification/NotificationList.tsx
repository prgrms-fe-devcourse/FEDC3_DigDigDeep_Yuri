import { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/user';
import { COLOR } from '../../utils/color';
import {
  getNotifications,
  seenNotifications,
} from '../../utils/api/notification';
import { ERROR_MESSAGES } from '../../utils/messages';
import useToast from '../../hooks/useToast';
import type { NotificationResponse } from '../../types/api/notification';

const NotificationList = () => {
  const [user] = useRecoilState(userState);
  const { showToast } = useToast();

  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    []
  );

  const fetchNotifications = useCallback(async () => {
    try {
      const notifications = await getNotifications();
      setNotifications(notifications);
    } catch (error) {
      console.error(error);
      showToast({ message: ERROR_MESSAGES.GET_ERROR('알림을') });
    }
  }, [showToast]);

  const fetchSeenNotifications = useCallback(async () => {
    try {
      await seenNotifications();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchSeenNotifications();
    fetchNotifications();
  }, [fetchSeenNotifications, fetchNotifications]);

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
  width: 35%;
  min-width: 350px;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 88%;
    min-width: 0;
  }
`;

const Text = styled.h3`
  margin-top: 4rem;
  font-weight: 400;
  font-size: 1.5rem;
  text-align: center;
  color: ${COLOR.lightBrown};
`;
