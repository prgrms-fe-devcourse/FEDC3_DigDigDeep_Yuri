import { ReactNode } from 'react';
import styled from 'styled-components';
import { COLOR } from '../utils/color';
import type { ButtonHTMLAttributes } from 'react';

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  type: 'submit' | 'button';
}

const FormButton = ({ type, children, ...props }: FormButtonProps) => {
  return (
    <StyledButton type={type} style={{ ...props.style }} {...props}>
      {children}
    </StyledButton>
  );
};

export default FormButton;

const StyledButton = styled.button`
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 19px;
  letter-spacing: -0.01em;
  color: ${COLOR.white};
  padding: 1rem 0;
  background-color: ${COLOR.green};
  box-shadow: 0px 2px 4px 1px rgba(127, 176, 49, 0.37);
  border-radius: 23.5px;
`;
