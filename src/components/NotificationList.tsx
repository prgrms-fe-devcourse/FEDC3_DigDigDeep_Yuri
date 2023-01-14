import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import { getNotification } from '../utils/notification';
import { NotificationResponse } from '../types/response';

const NotificationList = () => {
  const [notifications, setNotification] = useState<NotificationResponse[]>([]);

  const fetchNotification = useCallback(async () => {
    try {
      const notifications = await getNotification();
      setNotification(notifications);
    } catch {
      alert('알림을 불러올 수 없습니다.');
    }
  }, []);

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
