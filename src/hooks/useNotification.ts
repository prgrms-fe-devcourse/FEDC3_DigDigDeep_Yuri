import { useState, useCallback, useMemo, useEffect } from 'react';
import { getNotification } from '../utils/api/notification';
import { NotificationResponse } from '../types/response';
import useToast from './useToast';

const useNotification = () => {
  const [notifications, setNotification] = useState<NotificationResponse[]>([]);

  const isSeen = useMemo(() => {
    const seenResults = notifications.map((v) => v.seen);
    if (seenResults.includes(false)) {
      return false;
    }
    return true;
  }, [notifications]);

  const { showToast } = useToast();

  const fetchNotification = useCallback(async () => {
    try {
      const notifications = await getNotification();
      setNotification(notifications);
    } catch (error) {
      setNotification([]);
      showToast({ message: '알림을 불러올 수 없습니다.' });
    }
  }, [showToast]);

  useEffect(() => {
    fetchNotification();
  }, [fetchNotification]);

  return {
    isSeen,
    notifications,
    fetchNotification,
  };
};

export default useNotification;
