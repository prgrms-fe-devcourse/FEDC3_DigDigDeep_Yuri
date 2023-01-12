import type { InputHTMLAttributes } from 'react';
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
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    rules,
    control,
  });

  const onClickHandler = () => {
    if (resetField) resetField(name);
  };

  return (
    <InputContainer>
      <InputWrapper style={{ borderColor: error ? '#e6540a' : '#e9e9e9' }}>
        <Icon
          name="user"
          size={16}
          // style={{ paddingLeft: 16, paddingRight: 16 }}
        />
        <StyledLabel htmlFor={name} />
        <StyledInput
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          id={name}
          autoComplete="off"
          {...props}
        />
        {value && (
          <StyledButton onClick={onClickHandler} type="button">
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
  gap: 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  background: ${COLOR.white};
  box-shadow: 0px 2px 4px rgba(146, 113, 96, 0.11);
  border-radius: 23.5px;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 5%;
  border: 1px solid;

  :focus-within {
    border: 1px solid ${COLOR.lightBrown};
  }
`;

const StyledLabel = styled.label`
  position: absolute;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  letter-spacing: -0.01em;
  color: ${COLOR.brownGray};
  font-weight: 400;
  font-size: 14px;
  line-height: 1rem;
  font-family: 'Inter';
  font-style: normal;
  flex-shrink: 1;
  flex-grow: 1;
  padding: 0;

  ::placeholder {
    color: inherit;
    line-height: 1rem;
  }
`;

const ErrorMessage = styled.span`
  font-family: 'Inter' sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 1rem;
  letter-spacing: -0.01em;
  color: ${COLOR.orange};
  padding: 0 1rem;
  height: 1rem;
`;

const StyledButton = styled.button`
  background-color: unset;
  border: none;
  padding: 0;
  width: 1rem;
  height: 1rem;
`;
