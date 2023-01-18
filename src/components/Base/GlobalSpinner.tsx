import Spinner from './Spinner';
import { useRecoilValue } from 'recoil';
import { loadingState } from '../../recoil/atoms/loading';
import styled from 'styled-components';

const GlobalSpinner = () => {
  const loading = useRecoilValue(loadingState);

  return (
    <>
      {loading ? (
        <Background>
          <Wrapper>
            <Spinner loading={loading} />
          </Wrapper>
        </Background>
      ) : null}
    </>
  );
};

export default GlobalSpinner;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  opacity: 1;
`;

const Wrapper = styled.div`
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
`;
