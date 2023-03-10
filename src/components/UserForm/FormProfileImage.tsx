import styled from 'styled-components';
import COLORS from '../../utils/colors';

import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import Image from '../Base/Image';
import { checkFileSize } from '../../utils/formRules';
import useToast from '../../hooks/useToast';
import { ERROR_MESSAGES } from '../../utils/messages';

const defaultProfile = require('../../assets/images/icon/default-profile.png');

interface UserInputPrpos<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
  src?: string;
}

const FormProfileImage = <T extends FieldValues>({
  name,
  control,
  src,
}: UserInputPrpos<T>) => {
  const {
    field: { onChange },
  } = useController({
    name,
    control,
  });

  const { showToast } = useToast();
  const [previewSrc, setPreviewSrc] = useState(src);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    else {
      const file = e.target.files[0];
      if (!checkFileSize(file.size)) {
        showToast({ message: ERROR_MESSAGES.MAX_SIZE_IS_10MB });
        return;
      }
      setPreviewSrc(URL.createObjectURL(file));
      onChange(file);
    }
  };

  return (
    <Container>
      <StyledButton type="button">
        <Label htmlFor={name}>
          <ImageContainer>
            <Image
              src={previewSrc ? previewSrc : defaultProfile}
              alt="default-profile"
            />
          </ImageContainer>
          <StyledSpan>EDIT</StyledSpan>
        </Label>
      </StyledButton>
      <Input onChange={onFileChange} id={name} type="file" accept="image/*" />
    </Container>
  );
};

export default FormProfileImage;

const Container = styled.div`
  margin-top: 6rem;
  position: relative;
  margin-bottom: 5rem;
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.7rem;
  color: ${COLORS.brownGray};
  width: 10rem;
  cursor: pointer;
`;

const StyledButton = styled.button`
  cursor: pointer;
  :disabled {
    cursor: not-allowed;
  }
`;

const StyledSpan = styled.span``;

const ImageContainer = styled.div`
  display: block;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;
