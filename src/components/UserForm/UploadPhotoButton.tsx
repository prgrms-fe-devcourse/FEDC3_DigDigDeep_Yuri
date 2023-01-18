import styled from 'styled-components';
import { COLOR } from '../../utils/color';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms/user';
import { useState } from 'react';
import { uploadPhoto } from '../../utils/api/user';
import useGetMyInfo from '../../hooks/useGetMyInfo';

const UploadPhotoButton = () => {
  const user = useRecoilValue(userState);
  const getMyInfo = useGetMyInfo();

  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    await uploadPhoto(file);
    await getMyInfo();
    try {
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageButtonContainer>
      <StyledButton disabled={isLoading}>
        <StyledLabel htmlFor="file">
          <ImageContainer>
            <Image
              src={user.image ? user.image : '/image/default-profile.png'}
              alt="default-profile"
            />
          </ImageContainer>
          <StyledSpan>EDIT</StyledSpan>
        </StyledLabel>
      </StyledButton>
      <StyledInput
        id="file"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </ImageButtonContainer>
  );
};

export default UploadPhotoButton;

const StyledInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.7rem;
  color: ${COLOR.brownGray};
  width: 10.7rem;
  height: 10.7rem;
  cursor: pointer;
`;

const ImageButtonContainer = styled.div`
  margin-top: 6rem;
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
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;
