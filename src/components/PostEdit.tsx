import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { COLOR } from '../utils/color';
import Icon from './Base/Icon';
import { getPost } from '../utils/post';

interface Props {
  postId?: string;
  hasId: boolean;
  title: string;
  body: string;
  setTitle: (v: string) => void;
  setBody: (v: string) => void;
  handleTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBody: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PostEdit = ({
  postId,
  hasId,
  title,
  body,
  setTitle,
  setBody,
  handleTitle,
  handleBody,
}: Props) => {
  const fetchPost = useCallback(async () => {
    try {
      if (postId) {
        const { title } = await getPost(postId);
        const data = JSON.parse(title);
        setTitle(data.title);
        setBody(data.body);
      }
    } catch (error) {
      alert('그라운드 정보를 불러올 수 없습니다.');
    }
  }, [postId, setTitle, setBody]);

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
      <Button>
        <Icon name="add-image" size={40} />
      </Button>
    </Container>
  );
};

export default PostEdit;

const Container = styled.div`
  width: 50%;
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
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
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
  height: 100%;
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 2.3rem;
  letter-spacing: -0.01em;
  color: ${COLOR.brown};

  ::placeholder {
    color: ${COLOR.brownGray};
    font-weight: 300;
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

  @media screen and (max-width: 767px) and (orientation: portrait) {
    right: 2rem;
  }
`;
