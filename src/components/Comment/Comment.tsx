import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import { userState } from '../../recoil/atoms/user';
import { CommentResponse } from '../../types/response';
import { COLOR } from '../../utils/color';
import { deleteComment } from '../../utils/api/comment';
import { formatDate } from '../../utils/formatDate';
import useGetMyInfo from '../../hooks/useGetMyInfo';
import useToast from '../../hooks/useToast';
import Divider from './../Base/Divider';
import Icon from './../Base/Icon';
import { ROUTES } from '../../utils/routes';
import {
  CONFIRM_MESSAGES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from '../../utils/messages';

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
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { showToast } = useToast();
  const getMyInfo = useGetMyInfo();
  const isMyComment = author._id === user._id;

  const toUserProfile = () => {
    navigate(ROUTES.PROFILE_BY_USER_ID(author._id));
  };

  const handleDeleteComment = async () => {
    showModal({
      message: CONFIRM_MESSAGES.DELETE_CONFIRM,
      handleConfirm: async () => {
        try {
          await deleteComment(_id);
          await getMyInfo();
          if (fetchHandler) fetchHandler();
          showToast({ message: SUCCESS_MESSAGES.DELETE_COMMENT_SUCCESS });
        } catch (error) {
          console.error(error, ERROR_MESSAGES.DELETE_ERROR('댓글'));
          showToast({ message: ERROR_MESSAGES.SERVER_ERROR });
        }
      },
    });
  };

  return (
    <Container {...props} isMyComment={isMyComment}>
      <CommentWrapper>
        <CommentHeader>
          <Wrapper onClick={toUserProfile}>
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
              <Button onClick={handleDeleteComment}>
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
  width: 95%;
  margin: 0 auto;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 90%;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  margin: 0 auto;
  @media screen and (max-width: 767px) and (orientation: portrait) {
    padding: 0;
  }
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
