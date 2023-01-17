import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userState } from '../recoil/atoms/user';
import { PostResponse } from '../types/response';
import { COLOR } from '../utils/color';
import { formatDate } from '../utils/formatDate';
import { createLike, deleteLike } from '../utils/like';
import { sendNotification } from '../utils/notification';
import { deletePost } from '../utils/post';
import Divider from './Base/Divider';
import Icon from './Base/Icon';

interface PostProps extends PostResponse {
  checkIsMine?: boolean;
}

const Post = ({
  _id,
  title,
  createdAt,
  author,
  likes,
  comments,
  image,
  checkIsMine = false,
  ...props
}: PostProps) => {
  const [user, setUser] = useRecoilState(userState);
  const [likesState, setLikesState] = useState(likes);
  const navigate = useNavigate();

  const handleShare = (postId: string) => {
    navigator.clipboard.writeText(`${window.location.href}posts/${postId}`);
  };

  const toUserProfile = (authorId: string) => {
    navigate(`/profile/${authorId}`);
  };

  const toPostDetail = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 삭제하시겠습니다?')) {
      try {
        await deletePost(_id);
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${_id}`);
  };

  const handleLike = async (postId: string, authorId: string) => {
    const isLike = likesState.findIndex((like) => like.user === user._id);
    if (isLike === -1) {
      const { data } = await createLike(postId);
      if (user.likes && user._id) {
        setLikesState([...likesState, data]);
        setUser({
          ...user,
          likes: [...user.likes, data],
        });
        sendNotification('LIKE', data._id, authorId, postId);
      }
    } else {
      setLikesState(
        likesState.filter((item) => item._id !== likesState[isLike]._id)
      );
      if (user.likes) {
        setUser({
          ...user,
          likes: user.likes.filter(
            (item) => item._id !== likesState[isLike]._id
          ),
        });
      }
      deleteLike(likesState[isLike]._id);
    }
  };

  return (
    <Container {...props}>
      <PostHeader>
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
          <Button onClick={() => handleShare(_id)}>
            <Icon name="share" size={12} />
          </Button>
        </Wrapper>
      </PostHeader>
      <Section onClick={() => toPostDetail(_id)}>
        <Title>{title}</Title>
        {image && <Image src={image} />}
        <Text>{title}</Text>
      </Section>
      {checkIsMine && user._id === author._id ? (
        <Footer>
          <IconContainer>
            <StyledDiv>
              {likesState.find((like) => like.user === user._id) ? (
                <IconWrapper>
                  <Button onClick={() => handleLike(_id, author._id)}>
                    <Icon name="liked" size={12} />
                  </Button>
                  <SmText>{likesState.length}</SmText>
                </IconWrapper>
              ) : (
                <IconWrapper>
                  <Button onClick={() => handleLike(_id, author._id)}>
                    <Icon name="unliked" size={12} />
                  </Button>
                  {likesState.length > 999 ? (
                    <SmText>999+</SmText>
                  ) : (
                    <SmText>{likesState.length}</SmText>
                  )}
                </IconWrapper>
              )}
              <IconWrapper>
                <Button onClick={() => toPostDetail(_id)}>
                  <Icon name="comment" size={12} />
                </Button>
                {comments.length > 999 ? (
                  <SmText>999+</SmText>
                ) : (
                  <SmText>{comments.length}</SmText>
                )}
              </IconWrapper>
            </StyledDiv>
            <StyledDiv>
              <IconWrapper>
                <Button onClick={handleDelete}>
                  <Icon name="delete" size={13} />
                </Button>
              </IconWrapper>
              <IconWrapper>
                <Button onClick={handleEdit}>
                  <Icon name="edit" size={16} />
                </Button>
              </IconWrapper>
            </StyledDiv>
          </IconContainer>
        </Footer>
      ) : (
        <Footer>
          {likesState.find((like) => like.user === user._id) ? (
            <IconWrapper>
              <Button onClick={() => handleLike(_id, author._id)}>
                <Icon name="liked" size={12} />
              </Button>
              <SmText>{likesState.length}</SmText>
            </IconWrapper>
          ) : (
            <IconWrapper>
              <Button onClick={() => handleLike(_id, author._id)}>
                <Icon name="unliked" size={12} />
              </Button>
              {likesState.length > 999 ? (
                <SmText>999+</SmText>
              ) : (
                <SmText>{likesState.length}</SmText>
              )}
            </IconWrapper>
          )}
          <IconWrapper>
            <Button onClick={() => toPostDetail(_id)}>
              <Icon name="comment" size={12} />
            </Button>
            {comments.length > 999 ? (
              <SmText>999+</SmText>
            ) : (
              <SmText>{comments.length}</SmText>
            )}
          </IconWrapper>
        </Footer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

const Section = styled.div`
  background-color: ${COLOR.white};
  padding: 1rem 1.4rem;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.4rem;
`;

const Title = styled.span`
  display: block;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 2rem;
  letter-spacing: -0.01em;
  color: ${COLOR.brown};
  margin-bottom: 0.4rem;
`;

const Text = styled.div`
  font-weight: 350;
  font-size: 0.8rem;
  line-height: 1.4rem;
  letter-spacing: -0.01em;
  color: ${COLOR.brown};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const SmText = styled.span`
  font-weight: 350;
  font-size: 0.8rem;
  line-height: 1.4rem;
  letter-spacing: -0.01em;
  color: ${COLOR.brown};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:first-child {
    margin-right: 1rem;
  }
`;

const StyledDiv = styled.div`
  display: flex;
`;

const IconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  cursor: pointer;
`;

const UserName = styled.span`
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 2rem;
  letter-spacing: -0.01em;
  color: ${COLOR.brown};
`;

const Date = styled.span`
  font-weight: 350;
  font-size: 0.8rem;
  line-height: 2rem;
  letter-spacing: -0.01em;
  color: ${COLOR.date};
`;

const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 0.4rem;
`;

const Image = styled.img``;

export default Post;
