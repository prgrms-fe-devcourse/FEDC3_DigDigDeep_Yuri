import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toastsState } from '../../recoil/atoms/toast';
import ToastItem from './ToastItem';

const ToastList = () => {
  const toasts = useRecoilValue(toastsState);

  return (
    <StyledToastList>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
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
