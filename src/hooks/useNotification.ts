import { useState, useMemo, useEffect } from 'react';
import { getNotifications } from '../utils/api/notification';
import { NotificationResponse } from '../types/response';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../recoil/atoms/user';

const useCheckNotifications = () => {
  const token = useRecoilValue(tokenState);
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    []
  );

  const isSeen = useMemo(() => {
    const seenResults = notifications.map((v) => v.seen);
    if (seenResults.includes(false)) {
      return false;
    }
    return true;
  }, [notifications]);

  useEffect(() => {
    const handleInterval = setInterval(async () => {
      if (!token) return;
      const notifications = await getNotifications();
      setNotifications(notifications);
    }, 15000);
    return () => {
      clearInterval(handleInterval);
    };
  }, [token]);

  return {
    isSeen,
  };
};

export default useCheckNotifications;
