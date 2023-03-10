import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { v4 } from 'uuid';
import { toastsState } from '../recoil/atoms/toast';
import type { ToastProps } from '../recoil/atoms/toast';

const useToast = () => {
  const [toasts, setToasts] = useRecoilState(toastsState);

  const hideToast = useCallback(
    (toastId: string) => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== toastId)
      );
    },
    [setToasts]
  );

  const showToast = useCallback(
    (toast: ToastProps) => {
      const newToastId = v4();
      setToasts((currentToasts) => [
        ...currentToasts,
        { ...toast, id: newToastId },
      ]);
      setTimeout(() => hideToast(newToastId), 500 + (toast.duration ?? 1000));
    },
    [hideToast, setToasts]
  );

  return { toasts, showToast };
};

export default useToast;
