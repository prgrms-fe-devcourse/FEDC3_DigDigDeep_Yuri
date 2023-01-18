import { useState } from 'react';
import styled from 'styled-components';

interface ImageProps {
  src: string;
  alt: string;
}

const Image = ({ src, alt }: ImageProps) => {
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      <StyledImage src={src} onLoad={onLoad} loaded={loaded} alt={alt} />
      {!loaded && <Skleton />}
    </>
  );
};

export default Image;

const Skleton = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
  border-radius: inherit;
  background-image: linear-gradient(
    90deg,
    #dfe3e8 0px,
    #efefef 40px,
    #dfe3e8 80px
  );
  background-size: 200% 100%;
  background-position: 0 center;
  animation: skeleton--zoom-in 0.2s ease-out,
    skeleton--loading 2s infinite linear;

  @keyframes skeleton--zoom-in {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes skeleton--loading {
    0% {
      background-position-x: 100%;
    }
    50% {
      background-position-x: -100%;
    }
    100% {
      background-position-x: -100%;
    }
  }
`;

const StyledImage = styled.img<{ loaded: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${({ loaded }) => (loaded ? '1' : '0')};
  position: ${({ loaded }) => (loaded ? 'unset' : 'absolute')};
  transition: all 0.5s ease-in;
  border-radius: inherit;
`;
