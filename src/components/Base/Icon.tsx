import type { CSSProperties } from 'react';
import styled from 'styled-components';

interface IconProps {
  name: string;
  width: number;
  height: number;
  style?: CSSProperties;
}

const Icon = ({
  name,
  width = 16,
  height = 16,
  style,
  ...props
}: IconProps) => {
  const shapeStyle = {
    width,
    height,
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
