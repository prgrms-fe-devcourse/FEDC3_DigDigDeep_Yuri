import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import { useRecoilValue } from 'recoil';
import { modalState } from '../../recoil/atoms/modal';
import { COLOR } from '../../utils/color';

interface ButtonProps {
  isConfirm?: boolean;
}

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
    <Background onClick={hideModal}>
      <Modal>
        <Messasge>{message}</Messasge>

        <ButtonContainer>
          <Button onClick={onCancel}>NO</Button>
          <Button isConfirm={true} onClick={onConfirm}>
            YES
          </Button>
        </ButtonContainer>
      </Modal>
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

const Modal = styled.div`
  width: 75%;
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  transform: translate(-50%, -50%);
  padding: 6rem 4.6rem 3rem 4.6rem;
  background: ${COLOR.white};
  box-shadow: 0px 3px 4px rgba(95, 95, 95, 0.24);
  border-radius: 15px;
  box-sizing: border-box;
`;

const Messasge = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.3rem;
  letter-spacing: -0.01em;
  text-align: center;

  color: ${COLOR.text};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

const Button = styled.button<ButtonProps>`
  font-weight: 700;
  font-size: 1.1rem;
  align-items: center;
  text-align: center;
  letter-spacing: -0.01em;
  width: 7rem;

  color: ${COLOR.white};
  background-color: ${({ isConfirm }) =>
    isConfirm ? COLOR.green : COLOR.lightGray};
  border-radius: 23.5px;
  padding: 1rem;
`;
