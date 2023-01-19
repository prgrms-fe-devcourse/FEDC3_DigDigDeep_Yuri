import { useState, useCallback, useMemo, useEffect } from 'react';
import { getNotification } from '../utils/api/notification';
import { NotificationResponse } from '../types/response';
import useToast from './useToast';
import { ERROR_MESSAGES } from '../utils/messages';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../recoil/atoms/user';

const useNotification = () => {
  const [notifications, setNotification] = useState<NotificationResponse[]>([]);
  const token = useRecoilValue(tokenState);

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
      showToast({ message: ERROR_MESSAGES.GET_ERROR('알림을') });
    }
  }, [showToast]);

  useEffect(() => {
    if (!token) return;
    fetchNotification();
  }, [fetchNotification, token]);

  return {
    isSeen,
    notifications,
    fetchNotification,
  };
};

export default useNotification;
