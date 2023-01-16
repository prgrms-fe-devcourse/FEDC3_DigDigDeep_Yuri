import { atom } from 'recoil';

export type ToastProps = {
  id?: string;
  message: string;
  duration?: number;
};

export const toastsState = atom<ToastProps[]>({
  key: 'toastsState',
  default: [],
});
