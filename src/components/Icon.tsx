import type { CSSProperties } from 'react';
import styled from 'styled-components';

interface IconProps {
  name: string;
  size: number;
  style?: CSSProperties;
}

const Icon = ({ name, size = 16, style, ...props }: IconProps) => {
  const shapeStyle = {
    width: size,
    height: size,
    ...style,
  };

  return (
    <IconContainer {...props} style={shapeStyle}>
      <StyledIcon src={`/image/icon/${name}.png`} alt={name} />
    </IconContainer>
  );
};

export default Icon;

const IconContainer = styled.i`
  display: inline-block;
`;

const StyledIcon = styled.img`
  width: inherit;
  height: inherit;
`;
