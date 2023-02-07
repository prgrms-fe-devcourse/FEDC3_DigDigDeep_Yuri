import React, { ReactNode, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import useGetMyInfo from '../../hooks/useGetMyInfo';
import useToast from '../../hooks/useToast';
import { tokenState } from '../../recoil/atoms/user';
import { COLOR } from '../../utils/color';
import { createComment } from '../../utils/api/comment';
import { sendNotification } from '../../utils/api/notification';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../utils/messages';
import type { PostResponse } from '../../types/api/post';

interface CommentInputProps extends Pick<PostResponse, '_id' | 'author'> {
  fetchHandler?: () => Promise<void>;
}

interface FormProps {
  children: ReactNode[];
  isFocus: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CommentInput = ({ _id, author, fetchHandler }: CommentInputProps) => {
  const [comment, setComment] = useState('');
  const { showToast } = useToast();
  const getMyInfo = useGetMyInfo();
  const token = useRecoilValue(tokenState);
  const [isFocus, setIsFocus] = useState(false);

  const onInputFocus = () => setIsFocus(true);

  const onInputBlur = () => setIsFocus(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    content: string,
    postId: string
  ) => {
    e.preventDefault();
    if (!token) return showToast({ message: ERROR_MESSAGES.REQUIRE_LOGIN });
    if (!comment)
      return showToast({ message: ERROR_MESSAGES.REQUIRE_INPUT('내용을') });
    try {
      const data = await createComment(content, postId);
      await getMyInfo();
      sendNotification('COMMENT', data._id, author._id, postId);
      if (fetchHandler) fetchHandler();
      showToast({ message: SUCCESS_MESSAGES.CREATE_COMMENT_SUCCESS });
      setComment('');
    } catch (error) {
      console.error(ERROR_MESSAGES.CREATE_ERROR('댓글'), error);
      showToast({ message: ERROR_MESSAGES.SERVER_ERROR });
    }
  };

  return (
    <Container>
      <Form isFocus={isFocus} onSubmit={(e) => onSubmit(e, comment, _id)}>
        <Input
          type="text"
          value={comment}
          placeholder="디깅을 시작해보세요!"
          onChange={onChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
        <Button>디깅</Button>
      </Form>
    </Container>
  );
};

export default CommentInput;

const Container = styled.div`
  background-color: ${COLOR.white};
  width: 35%;
  min-width: 350px;
  position: fixed;
  bottom: 0;
  padding-top: 1.3rem;
  padding-bottom: 1.5rem;
  border-radius: 1.4rem 1.4rem 0 0;
  box-shadow: 0px -4px 5px rgba(164, 164, 164, 0.198);

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    min-width: 0;
  }
`;

const Form = styled.form<FormProps>`
  background-color: ${COLOR.white};
  width: 90%;
  margin: 0 auto;
  display: flex;
  padding: 1.2rem 1rem;
  border-radius: 23.5px;
  align-items: center;
  justify-content: space-between;
  gap: 1.3rem;
  border: 1px solid;
  box-sizing: border-box;
  border-color: ${({ isFocus }) =>
    isFocus ? COLOR.lightBrown : COLOR.lightGray};
`;

const Input = styled.input`
  width: 100%;
  letter-spacing: -0.01em;
  color: ${COLOR.lightBrown};
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0;
  padding-left: 1.7rem;

  ::placeholder {
    color: ${COLOR.brownGray};
    line-height: 1rem;
    font-weight: 400;
  }
`;

const Button = styled.button`
  width: 5rem;
  font-weight: 700;
  font-size: 1.4rem;
  letter-spacing: -0.01em;
  color: ${COLOR.brown};
  cursor: pointer;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    padding-right: 1rem;
  }
`;
