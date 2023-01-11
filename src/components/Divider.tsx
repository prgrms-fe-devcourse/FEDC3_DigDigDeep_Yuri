import styled from 'styled-components';

const Line = styled.hr`
  border: none;
  background-color: #aaa;

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

const Divider = ({ type = 'horizontal', size = 8, ...props }) => {
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
