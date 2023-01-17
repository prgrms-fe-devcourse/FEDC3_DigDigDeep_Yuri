import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import { useRecoilValue } from 'recoil';
import { ModalProps, modalState } from '../../recoil/atoms/modal';
import { COLOR } from '../../utils/color';
import { useEffect, useState } from 'react';

interface ButtonProps {
  isConfirm?: boolean;
}

const Modal = () => {
  const modalProps = useRecoilValue(modalState);
  return <>{modalProps ? <ConfirmModal {...modalProps} /> : null}</>;
};

export default Modal;

const ConfirmModal = ({ message, handleClose, handleConfirm }: ModalProps) => {
  const { hideModal } = useModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const close = () => {
    setVisible(false);
    setTimeout(() => {
      hideModal();
    }, 300);
  };

  const onCancel = () => {
    if (handleClose) handleClose();
    close();
  };

  const onConfirm = async () => {
    if (handleConfirm) await handleConfirm();
    close();
  };

  return (
    <Background visible={visible} onClick={close}>
      <Container visible={visible}>
        <Messasge>{message}</Messasge>

        <ButtonContainer>
          <Button onClick={onCancel}>NO</Button>
          <Button isConfirm={true} onClick={onConfirm}>
            YES
          </Button>
        </ButtonContainer>
      </Container>
    </Background>
  );
};

const Background = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const Container = styled.div<{ visible: boolean }>`
  width: 75%;
  position: relative;
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

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    padding: 4rem 2.5rem;
  }
`;

const Messasge = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.3rem;
  letter-spacing: -0.01em;
  text-align: center;
  word-break: keep-all;

  color: ${COLOR.text};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
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
