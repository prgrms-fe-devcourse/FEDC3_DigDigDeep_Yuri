import { useRecoilState } from 'recoil';
import { modalState } from '../recoil/atoms/modal';
import type { ModalProps } from '../recoil/atoms/modal';

const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const showModal = (modalProps: ModalProps) => {
    setModal(modalProps);
  };

  const hideModal = () => {
    setModal(null);
  };

  return { modal, showModal, hideModal };
};

export default useModal;
