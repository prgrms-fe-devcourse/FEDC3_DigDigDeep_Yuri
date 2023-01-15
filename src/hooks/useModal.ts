import { useRecoilState } from 'recoil';
import { ModalProps, modalState } from '../recoil/atoms/modal';

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
