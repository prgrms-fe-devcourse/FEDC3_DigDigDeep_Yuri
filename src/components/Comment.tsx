import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userState } from '../recoil/atoms/user';
import { CommentResponse } from '../types/response';
import { deleteComment } from '../utils/comment';
import Icon from './Base/Icon';

interface CommentProps extends CommentResponse {
  fetchHandler?: () => Promise<void>;
}

const Comment = ({
  _id,
  comment,
  author,
  post,
  createdAt,
  fetchHandler,
  ...props
}: CommentProps) => {
  const [user, setUser] = useRecoilState(userState);

  const handleDeleteComment = async (commentId: string) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await deleteComment(commentId);
        setUser({
          ...user,
          comments: user.comments.filter(
            (comment) => comment._id !== commentId
          ),
        });
        if (fetchHandler) fetchHandler();
      } catch (error) {
        console.error(error, '댓글 삭제에 실패하였습니다.');
      }
    }
  };

  return (
    <>
      <CommentHeader>
        {author.image ? (
          <ProfileImage src={author.image} />
        ) : (
          <Icon name="default-profile" size={25} />
        )}
        <div>{author.fullName}</div>
        <div>{createdAt}</div>:<div>{comment}</div>
      </CommentHeader>
      {author._id === user._id && (
        <button
          onClick={() => {
            handleDeleteComment(_id);
          }}
        >
          삭제
        </button>
      )}
    </>
  );
};

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

const ProfileImage = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  margin-right: 0.4rem;
`;

export default Comment;
