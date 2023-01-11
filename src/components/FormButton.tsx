import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

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
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;
  color: #f8f8f8;
  padding-top: 16px;
  padding-bottom: 15px;
  background-color: #95c746;
  box-shadow: 0px 2px 4px 1px rgba(127, 176, 49, 0.37);
  border-radius: 23.5px;
  border: 1px solid #e9e9e9;
`;
