import { CSSProperties } from 'react';
import styled from 'styled-components';
interface IconProps {
  name: string;
  size?: number;
  width?: number;
  height?: number;
  style?: CSSProperties;
}

const Icon = ({ name, size, width, height, style, ...props }: IconProps) => {
  const shapeStyle = size
    ? { width: size, height: size, ...style }
    : { width: width, height: height, ...style };

  return (
    <IconContainer {...props} style={shapeStyle}>
      <StyledIcon
        src={require(`../../assets/images/icon/${name}.png`)}
        alt={name}
      />
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
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;
