import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastProps } from '../../recoil/atoms/toast';
import { COLOR } from '../../utils/color';

const ToastItem = ({ message, duration = 1200 }: ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const setTimeoutHandler2 = setTimeout(() => {
      setVisible(false);
      clearTimeout(setTimeoutHandler2);
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

  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  text-align: center;
  letter-spacing: -0.01em;

  box-shadow: 0px 3px 4px rgba(218, 218, 218, 0.24);
  border-radius: 15px;

  color: ${COLOR.text};

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.4s ease-out;
`;
