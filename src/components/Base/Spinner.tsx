import styled from 'styled-components';
import COLORS from '../../utils/colors';

interface SpinnerProps {
  loading: boolean;
  height?: number;
  width?: number;
  stroke?: number;
  display?: 'block' | 'inline-block';
}

interface ContainerProps {
  size: Pick<SpinnerProps, 'width' | 'height'>;
  stroke: number;
  display: string;
}

const Spinner = ({
  loading,
  width = 5,
  height = 5,
  display = 'block',
  stroke = 0.5,
}: SpinnerProps) => {
  return loading ? (
    <StyledSpinner
      size={{ width, height }}
      stroke={stroke}
      display={display}
    ></StyledSpinner>
  ) : null;
};
export default Spinner;

const StyledSpinner = styled.div<ContainerProps>`
  display: ${({ display }) => display};
  width: ${({ size }) => `${size.width}rem`};
  height: ${({ size }) => `${size.height}rem`};

  color: ${COLORS.lightGray};
  border-width: ${({ stroke }) => `${stroke}rem`};
  border-style: solid;

  border-top-color: ${COLORS.lightGray};
  border-right-color: ${COLORS.lightGray};
  border-left-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;
  margin: 1.6rem auto;
  animation: spinner 0.7s linear infinite;

  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;
