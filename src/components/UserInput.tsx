import { InputHTMLAttributes, useState } from 'react';
import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormResetField,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import styled from 'styled-components';
import Icon from './Icon';
import { COLOR } from '../utils/color';

interface UserInputPrpos<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  resetField?: UseFormResetField<T>;
}

const UserInput = <T extends FieldValues>({
  name,
  rules,
  control,
  resetField,
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

  const onClick = () => {
    ref(() => {});
    if (resetField) resetField(name);
  };

  const [isFocus, setIsFocus] = useState(false);

  return (
    <InputContainer>
      <InputWrapper
        style={{
          borderColor: error
            ? `${COLOR.orange}`
            : isFocus
            ? `${COLOR.lightBrown}`
            : `${COLOR.lightGray}`,
        }}
      >
        <Icon name="user" size={16} />
        <StyledLabel htmlFor={name} />
        <StyledInput
          value={value}
          onChange={onChange}
          onBlur={() => {
            setIsFocus(false);
            onBlur();
          }}
          onFocus={() => setIsFocus(true)}
          id={name}
          autoComplete="off"
          {...props}
        />
        {value && (
          <StyledButton onClick={onClick} type="button">
            <Icon name="close" size={16} />
          </StyledButton>
        )}
      </InputWrapper>
      <ErrorMessage>{error?.message && error.message}</ErrorMessage>
    </InputContainer>
  );
};

export default UserInput;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  background: ${COLOR.white};
  box-shadow: 0px 2px 4px rgba(146, 113, 96, 0.11);
  border-radius: 23.5px;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 1.6rem 5%;
  border: 1px solid;
`;

const StyledLabel = styled.label`
  position: absolute;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  letter-spacing: -0.01em;
  color: ${COLOR.lightBrown};
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-family: 'Inter';
  font-style: normal;
  flex-shrink: 1;
  flex-grow: 1;
  padding: 0;

  ::placeholder {
    color: inherit;
    line-height: 1.6rem;
  }
`;

const ErrorMessage = styled.span`
  font-family: 'Inter' sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 1.6rem;
  letter-spacing: -0.01em;
  color: ${COLOR.orange};
  padding: 0 1.6rem;
  height: 1.6rem;
`;

const StyledButton = styled.button`
  background-color: unset;
  border: none;
  padding: 0;
  width: 1.6rem;
  height: 1.6rem;
`;
