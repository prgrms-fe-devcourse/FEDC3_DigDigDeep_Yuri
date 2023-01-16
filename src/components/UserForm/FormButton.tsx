import { ReactNode } from 'react';
import styled from 'styled-components';
import { COLOR } from '../../utils/color';
import type { ButtonHTMLAttributes } from 'react';

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  type: 'submit' | 'button';
  isValid?: boolean;
  isSubmitting?: boolean;
}

const FormButton = ({
  type,
  children,
  isValid = true,
  isSubmitting = false,
  ...props
}: FormButtonProps) => {
  return (
    <Button
      type={type}
      disabled={isSubmitting}
      isValid={isValid}
      isSubmitting={isSubmitting}
      style={{ ...props.style }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default FormButton;

const Button = styled.button<FormButtonProps>`
  width: 100%;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.9rem;
  letter-spacing: -0.01em;
  color: ${COLOR.white};
  padding: 1.6rem 0;
  background-color: ${({ isValid }) =>
    isValid ? `${COLOR.green}` : `${COLOR.lightGray}`};
  box-shadow: ${({ isValid, isSubmitting }) =>
    !isValid && isSubmitting
      ? '0px 2px 4px 1px rgba(127, 176, 49, 0.37)'
      : 'none'};
  border-radius: 23.5px;
  border: none;
  cursor: pointer;

  :disabled {
    cursor: not-allowed;
  }
`;
