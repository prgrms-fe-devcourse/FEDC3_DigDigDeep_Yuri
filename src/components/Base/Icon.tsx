import { CSSProperties } from 'react';
import styled from 'styled-components';
interface IconProps {
  name: string;
  size?: number;
  width?: number;
  height?: number;
  style?: CSSProperties;
}

interface StyledIconProps {
  size?: number;
  widthProps?: number;
  heighProps?: number;
}

const Icon = ({ name, size, width, height, style, ...props }: IconProps) => {
  return (
    <IconContainer {...props}>
      <StyledIcon
        size={size}
        widthProps={width}
        heighProps={height}
        style={style}
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

const StyledIcon = styled.img<StyledIconProps>`
  ${({ size, widthProps, heighProps }) =>
    size
      ? `
  width: ${size}px;
  height: ${size}px;
`
      : `
  width: ${widthProps}px;
  height: ${heighProps}px;
`}
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;
