import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Comment from '../components/Comment/Comment';
import CommentInput from '../components/Comment/CommentInput';
import Header from '../components/Header/Header';
import Post from '../components/Post/Post';
import { PostResponse } from '../types/response';
import { COLOR } from '../utils/color';
import { getPost } from '../utils/api/post';
import { ERROR_MESSAGES } from '../utils/messages';
import useToast from '../hooks/useToast';

type PostId = string;

const PostPage = () => {
  const { postId } = useParams<PostId>();
  const [post, setPost] = useState<PostResponse>();
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const { showToast } = useToast();

  const fetchAndScroll = async () => {
    await fetchHandler();
    setCommentSubmitted(true);
  };

  const toScrollBottom = () =>
    window.scroll({
      top: document.body.scrollHeight,
      left: 100,
      behavior: 'smooth',
    });

  const fetchHandler = useCallback(async () => {
    if (postId) {
      try {
        const postDetail = await getPost(postId);
        setPost(postDetail);
      } catch {
        showToast({ message: ERROR_MESSAGES.GET_ERROR('포스트를') });
      }
    }
  }, [postId, showToast]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  useEffect(() => {
    if (commentSubmitted) {
      toScrollBottom();
      setCommentSubmitted(false);
    }
  }, [commentSubmitted]);

  return (
    <Container>
      <Header />
      {post && (
        <Wrapper>
          <Post {...post} checkIsMine={true} isDetailPage={true} />
          <List>
            {post.comments.length ? (
              post.comments.map((comment) => (
                <ListItem key={comment._id}>
                  <Comment
                    _id={comment._id}
                    comment={comment.comment}
                    author={comment.author}
                    createdAt={comment.createdAt}
                    post={comment.post}
                    fetchHandler={fetchHandler}
                  />
                </ListItem>
              ))
            ) : (
              <Text>댓글이 없습니다.</Text>
            )}
          </List>
          <CommentInput
            _id={post._id}
            author={post.author}
            fetchHandler={fetchAndScroll}
          />
        </Wrapper>
      )}
    </Container>
  );
};

export default PostPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 7.5rem;
`;

const List = styled.ul``;

const ListItem = styled.li``;

const Wrapper = styled.ul`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-width: 767px;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    min-width: 100%;
  }
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 1.4rem;
  letter-spacing: -0.01em;
  color: ${COLOR.brown};
`;
