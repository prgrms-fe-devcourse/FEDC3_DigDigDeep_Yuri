import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toastsState } from '../../recoil/atoms/toast';
import { COLOR } from '../../utils/color';

const ToastList = () => {
  const toasts = useRecoilValue(toastsState);

  return (
    <StyledToastList>
      {toasts.map(({ id, message }) => (
        <Toast key={id}>{message}</Toast>
      ))}
    </StyledToastList>
  );
};

export default ToastList;

const StyledToastList = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

const Toast = styled.div`
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
`;
