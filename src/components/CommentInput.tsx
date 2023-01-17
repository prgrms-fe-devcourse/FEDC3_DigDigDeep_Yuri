import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atoms/user';
import { PostResponse } from '../types/response';
import { createComment } from '../utils/comment';
import { sendNotification } from '../utils/notification';

interface CommentInputProps extends Pick<PostResponse, '_id' | 'author'> {
  fetchHandler?: () => Promise<void>;
}

const CommentInput = ({ _id, author, fetchHandler }: CommentInputProps) => {
  const [comment, setComment] = useState('');
  const [user, setUser] = useRecoilState(userState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    content: string,
    postId: string
  ) => {
    e.preventDefault();
    try {
      const data = await createComment(content, postId);
      sendNotification('COMMENT', data._id, author._id, postId);
      setUser({ ...user, comments: [...user.comments, data] });
      if (fetchHandler) fetchHandler();
      setComment('');
    } catch (error) {
      console.error('댓글 등록에 실패하였습니다.');
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e, comment, _id)}>
      <input type="text" value={comment} onChange={onChange} />
      <button>디깅</button>
    </form>
  );
};

export default CommentInput;
