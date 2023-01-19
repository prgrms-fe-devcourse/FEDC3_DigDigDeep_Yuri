import { InputHTMLAttributes, useState } from 'react';
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormResetField,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import styled from 'styled-components';
import Icon from '../Base/Icon';
import { COLOR } from '../../utils/color';
import ErrorMessage from './ErrorMessage';

interface UserInputPrpos<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  resetField?: UseFormResetField<T>;
  icon?: string;
}

interface InputWrapperProps {
  error?: FieldError;
  isFocus: boolean;
}

const FormInput = <T extends FieldValues>({
  name,
  rules,
  control,
  resetField,
  icon = 'user',
  ...props
}: UserInputPrpos<T>) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    rules,
    control,
  });

  const [isFocus, setIsFocus] = useState(false);

  const onInputFocus = () => setIsFocus(true);

  const onInputBlur = () => {
    setIsFocus(false);
    onBlur();
  };

  const onResetButtonClick = () => {
    if (resetField) resetField(name);
  };

  return (
    <InputContainer>
      <InputWrapper error={error} isFocus={isFocus}>
        <Icon name={icon} width={14} height={16} />
        <InputLabel htmlFor={name} />
        <Input
          value={value}
          onChange={onChange}
          onBlur={onInputBlur}
          onFocus={onInputFocus}
          id={name}
          autoComplete="off"
          {...props}
        />
        {resetField && value && (
          <ResetButton onClick={onResetButtonClick} type="button">
            <Icon name="close" size={13} />
          </ResetButton>
        )}
      </InputWrapper>
      <ErrorMessage>{error?.message && error.message}</ErrorMessage>
    </InputContainer>
  );
};

export default FormInput;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  background: ${COLOR.white};
  box-shadow: 0px 2px 4px rgba(146, 113, 96, 0.11);
  border-radius: 23.5px;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 1.6rem 2.4rem;
  border: 1px solid;
  border-color: ${({ error, isFocus }) =>
    error ? COLOR.orange : isFocus ? COLOR.lightBrown : COLOR.lightGray};
`;

const InputLabel = styled.label`
  position: absolute;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  letter-spacing: -0.01em;
  color: ${COLOR.lightBrown};
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.6rem;
  flex-shrink: 1;
  flex-grow: 1;
  padding: 0;

  ::placeholder {
    color: ${COLOR.brownGray};
    line-height: 1.6rem;
  }

  :disabled {
    background: inherit;
    color: ${COLOR.brownGray};
  }
`;

const ResetButton = styled.button`
  background-color: unset;
  border: none;
  padding: 0;
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
`;
