import { atom } from 'recoil';

export type ModalProps = {
  message: string;
  handleClose?: (...arg: unknown[]) => unknown;
  handleConfirm?: (...arg: unknown[]) => unknown;
};

export const modalState = atom<ModalProps | null>({
  key: 'modalState',
  default: null,
});
