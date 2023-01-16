import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastProps } from '../../recoil/atoms/toast';
import { COLOR } from '../../utils/color';

const ToastItem = ({ message, duration = 1000 }: ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const handleSetTimeout = setTimeout(() => {
      setVisible(false);
      clearTimeout(handleSetTimeout);
    }, duration);
  }, [duration]);

  return <Toast visible={visible}>{message}</Toast>;
};

export default ToastItem;

const Toast = styled.div<{ visible: boolean }>`
  width: 50%;
  position: absolute;
  left: 50%;
  bottom: 1.6rem;
  padding: 1.6rem 2.4rem;
  transform: translate(-50%, -50%);
  background-color: ${COLOR.lightGray};

  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  text-align: center;
  letter-spacing: -0.01em;

  box-shadow: 0px 3px 4px rgba(218, 218, 218, 0.24);
  border-radius: 15px;

  color: ${COLOR.text};

  opacity: ${({ visible }) => (visible ? 0.7 : 0)};
  transition: opacity 0.5s ease-in-out;
`;
