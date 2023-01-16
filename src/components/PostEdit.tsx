import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../utils/color';
import Icon from './Base/Icon';

interface Props {
  hasId: boolean;
  handleTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBody: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PostEdit = ({ hasId, handleTitle, handleBody }: Props) => {
  return (
    <Container>
      <Title
        onChange={handleTitle}
        placeholder={hasId ? '이미 있음' : '그라운드 제목을 주세요...'}
      />
      <Body onChange={handleBody} placeholder="내용을 입력해주세요..." />
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
