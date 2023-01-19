import { useState, useMemo, useEffect } from 'react';
import { getNotifications } from '../utils/api/notification';
import { NotificationResponse } from '../types/response';

const useCheckNotifications = () => {
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
      const notifications = await getNotifications();
      setNotifications(notifications);
    }, 5000);
    return () => {
      clearInterval(handleInterval);
    };
  }, []);

  return {
    isSeen,
  };
};

export default useCheckNotifications;
