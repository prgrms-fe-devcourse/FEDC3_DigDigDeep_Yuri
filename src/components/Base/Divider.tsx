import styled from 'styled-components';

interface Props extends React.ComponentPropsWithoutRef<'hr'> {
  type: string;
  size: number;
}

const Divider = ({ type = 'horizontal', size = 16, ...props }: Props) => {
  const dividerStyle = {
    margin: type === 'vertical' ? `0 ${size}px` : `${size}px auto`,
  };
  return (
    <Line
      {...props}
      className={type}
      style={{ ...dividerStyle, ...props.style }}
    />
  );
};

export default Divider;

const Line = styled.hr`
  border: none;
  background-color: #dadada;

  &.vertical {
    position: relative;
    top: -1;
    display: inline-block;
    width: 1px;
    height: 13px;
    vertical-align: middle;
  }

  &.horizontal {
    display: block;
    width: 100%;
    height: 1px;
  }
`;
