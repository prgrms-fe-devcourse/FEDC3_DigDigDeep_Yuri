import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import { useRecoilValue } from 'recoil';
import { modalState } from '../../recoil/atoms/modal';

const ConfirmModal = () => {
  const modalProps = useRecoilValue(modalState);
  const { hideModal } = useModal();

  if (!modalProps) return null;

  const { message, handleClose, handleConfirm } = modalProps;

  const onCancel = () => {
    if (handleClose) handleClose();
    hideModal();
  };

  const onConfirm = async () => {
    if (handleConfirm) await handleConfirm();
    hideModal();
  };

  return (
    <Background>
      <Container>
        <div>{message}</div>
        <button onClick={onCancel}>No</button>
        <button onClick={onConfirm}>Yes</button>
      </Container>
    </Background>
  );
};

export default ConfirmModal;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.8rem;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;
