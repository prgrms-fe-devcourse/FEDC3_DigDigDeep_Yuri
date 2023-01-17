import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userState } from '../recoil/atoms/user';
import { CommentResponse } from '../types/response';
import { COLOR } from '../utils/color';
import { deleteComment } from '../utils/comment';
import { formatDate } from '../utils/formatDate';
import Divider from './Base/Divider';
import Icon from './Base/Icon';

interface CommentProps extends CommentResponse {
  fetchHandler?: () => Promise<void>;
}

interface ContainerProps {
  isMyComment?: boolean;
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
  const navigate = useNavigate();
  const isMyComment = author._id === user._id;

  const toUserProfile = (authorId: string) => {
    navigate(`/profile/${authorId}`);
  };

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
    <Container {...props} isMyComment={isMyComment}>
      <CommentWrapper>
        <CommentHeader>
          <Wrapper onClick={() => toUserProfile(author._id)}>
            {author.image ? (
              <ProfileImage src={author.image} />
            ) : (
              <Icon name="default-profile" size={25} />
            )}
            <UserName>{author.fullName}</UserName>
            <Divider type="vertical" size={0.5} />
            <Date>{formatDate.fullDate(createdAt)}</Date>
          </Wrapper>
          <Wrapper>
            {isMyComment && (
              <Button
                onClick={() => {
                  handleDeleteComment(_id);
                }}
              >
                <Icon name="close" size={12} />
              </Button>
            )}
          </Wrapper>
        </CommentHeader>
        <Section>
          <Text>{comment}</Text>
        </Section>
      </CommentWrapper>
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  padding: 1rem 0;
  background-color: ${({ isMyComment }) =>
    isMyComment ? COLOR.gray : COLOR.white};
`;

const CommentWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 0 0 1rem 1.4rem; */
`;

const Section = styled.div`
  margin-top: 1rem;
`;

const Text = styled.div`
  font-weight: 350;
  font-size: 0.8rem;
  line-height: 1.4rem;
  letter-spacing: -0.01em;
  color: ${COLOR.brown};
`;

const ProfileImage = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  margin-right: 0.4rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
`;

const UserName = styled.span`
  font-weight: 500;
  font-size: 1rem;
  line-height: 2rem;
  letter-spacing: -0.01em;
  color: ${COLOR.brown};
`;

const Date = styled.span`
  font-weight: 350;
  font-size: 0.8rem;
  line-height: 0.8rem;
  letter-spacing: -0.01em;
  color: ${COLOR.date};
`;

const Button = styled.button`
  cursor: pointer;
`;

export default Comment;
