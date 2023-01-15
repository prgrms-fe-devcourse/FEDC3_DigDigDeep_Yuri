import { atom } from 'recoil';

export type ModalProps = {
  message: string;
  handleClose?: (...arg: any[]) => any;
  handleConfirm?: (...arg: any[]) => any;
};

export const modalState = atom<ModalProps | null>({
  key: 'modalState',
  default: null,
});
