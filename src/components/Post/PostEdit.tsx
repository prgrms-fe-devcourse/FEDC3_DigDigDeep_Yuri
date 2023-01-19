import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { COLOR } from '../../utils/color';
import Icon from './../Base/Icon';
import { getPost } from '../../utils/api/post';

interface Props {
  name?: string;
  postId?: string;
  hasId: boolean;
  title: string;
  body: string;
  image?: Blob | null;
  isLoading: boolean;
  setTitle: (v: string) => void;
  setBody: (v: string) => void;
  setImage: (v: Blob | null) => void;
  setImageId: (v: string) => void;
  handleTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBody: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostEdit = ({
  name,
  postId,
  hasId,
  title,
  body,
  image,
  isLoading,
  setTitle,
  setBody,
  setImage,
  setImageId,
  handleTitle,
  handleBody,
  handleImage,
}: Props) => {
  const [previewImage, setPreviewImage] = useState<string>('');

  const fetchPost = useCallback(async () => {
    try {
      if (postId) {
        const { title, image, imagePublicId } = await getPost(postId);
        const data = JSON.parse(title);
        setTitle(data.title);
        setBody(data.body);
        image && setPreviewImage(image);
        imagePublicId && setImageId(imagePublicId);
      }
    } catch (error) {
      alert('그라운드 정보를 불러올 수 없습니다.');
    }
  }, [postId, setTitle, setBody, setPreviewImage, setImageId]);

  const handleRemoveImage = () => {
    if (previewImage) {
      setPreviewImage('');
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId, fetchPost]);

  return (
    <Container>
      <Title
        onChange={handleTitle}
        placeholder={hasId ? '' : '그라운드 제목을 주세요...'}
        value={title}
      />
      <Body
        onChange={handleBody}
        placeholder="내용을 입력해주세요..."
        value={body}
      />
      <Wrapper>
        <Button disabled={isLoading}>
          <Label htmlFor="file">
            <Icon
              name="add"
              size={37}
              style={{
                filter: 'drop-shadow(0px 2px 4px rgba(191, 176, 168, 0.5))',
              }}
            />
          </Label>
        </Button>
        <Input id="file" type="file" accept="image/*" onChange={handleImage} />
      </Wrapper>
      {previewImage && !image && (
        <ImageFileWrapper>
          <ImageFile src={previewImage} alt="첨부 이미지" />
          <ImageDetail>
            <ImageHeader>
              <ImageTitle>기존 이미지</ImageTitle>
              <RemoveButton onClick={handleRemoveImage}>
                <Icon name="close" size={12} />
              </RemoveButton>
            </ImageHeader>
            <ImageName>{name}</ImageName>
          </ImageDetail>
        </ImageFileWrapper>
      )}
      {image && (
        <ImageFileWrapper>
          <ImageFile src={URL.createObjectURL(image)} alt="첨부 이미지" />
          <ImageDetail>
            <ImageHeader>
              <ImageTitle>첨부 파일</ImageTitle>
              <RemoveButton onClick={handleRemoveImage}>
                <Icon name="close" size={12} />
              </RemoveButton>
            </ImageHeader>
            <ImageName>{name}</ImageName>
          </ImageDetail>
        </ImageFileWrapper>
      )}
    </Container>
  );
};

export default PostEdit;

const Container = styled.div`
  width: 35%;
  min-width: 350px;
  height: 90vh;
  background: ${COLOR.white};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  box-shadow: 0px -1px 4px rgba(210, 210, 210, 0.25);

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    height: 92vh;
    gap: 1rem;
  }
`;

const Title = styled.textarea`
  width: 90%;
  font-weight: 500;
  font-size: 2.7rem;
  line-height: 3.5rem;
  letter-spacing: -0.01em;
  color: ${COLOR.brown};
  margin-top: 3rem;

  ::placeholder {
    color: ${COLOR.brownGray};
    font-weight: 400;
  }

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 86%;
    font-size: 2.2rem;
    margin-top: 2rem;
  }
`;

const Body = styled.textarea`
  width: 90%;
  height: 69%;
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 2.3rem;
  letter-spacing: -0.01em;
  color: ${COLOR.brown};

  ::placeholder {
    color: ${COLOR.brownGray};
    font-weight: 400;
  }

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 86%;
    font-size: 1.6rem;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 3rem;
  bottom: 2rem;
  z-index: 11;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    right: 2rem;
  }
`;

const Label = styled.label`
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const Wrapper = styled.div``;

const ImageFileWrapper = styled.div`
  position: absolute;
  left: 3rem;
  bottom: 2.5rem;
  background-color: ${COLOR.white};
  width: fit-content;
  height: 8rem;
  padding: 0 1.5rem;
  border: 0.2px solid rgba(191, 176, 168, 0.6);
  border-radius: 8px;
  box-shadow: 0px 2px 3px 1px rgba(219, 219, 219, 0.37);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  z-index: 10;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    left: 2.5rem;
    height: 7.5rem;
  }
`;

const ImageFile = styled.img`
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 10px;
  object-fit: cover;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 5rem;
    height: 5rem;
  }
`;

const ImageDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
`;

const ImageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ImageTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${COLOR.lightBrown};

  @media screen and (max-width: 767px) and (orientation: portrait) {
    font-size: 1.2rem;
  }
`;

const RemoveButton = styled.button`
  display: flex;
  margin: 0 0.5rem;
`;

const ImageName = styled.span`
  font-size: 1.4rem;
  color: ${COLOR.lightBrown};
  max-width: 17rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    font-size: 1.2rem;
    max-width: 8rem;
  }
`;
