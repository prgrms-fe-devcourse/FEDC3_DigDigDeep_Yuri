import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import { getNotification, seenNotification } from '../utils/notification';
import { NotificationResponse } from '../types/response';
import useToast from '../hooks/useToast';

const NotificationList = () => {
  const [notifications, setNotification] = useState<NotificationResponse[]>([]);

  const { showToast } = useToast();

  const fetchNotification = useCallback(async () => {
    try {
      const notifications = await getNotification();
      setNotification(notifications);

      await seenNotification();
    } catch {
      setNotification([]);
      showToast({ message: '알림을 불러올 수 없습니다.' });
    }
  }, [showToast]);

  useEffect(() => {
    fetchNotification();
  }, [fetchNotification]);

  return (
    <List>
      {notifications.map((notification) => (
        <Notification key={notification._id} {...notification} />
      ))}
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
