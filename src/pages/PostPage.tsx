import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Comment from '../components/Comment';
import CommentInput from '../components/CommentInput';
import Header from '../components/Header';
import Post from '../components/Post';
import { PostResponse } from '../types/response';
import { COLOR } from '../utils/color';
import { getPost } from '../utils/post';

type PostId = string;

const PostPage = () => {
  const { postId } = useParams<PostId>();
  const [post, setPost] = useState<PostResponse>();

  const fetchHandler = useCallback(async () => {
    if (postId) {
      try {
        const postDetail = await getPost(postId);
        setPost(postDetail);
      } catch {
        alert('포스트 정보를 불러올 수 없습니다.');
      }
    }
  }, [postId]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  return (
    <Container>
      <Header />
      {post && (
        <Wrapper>
          <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            createdAt={post.createdAt}
            author={post.author}
            likes={post.likes}
            comments={post.comments}
            image={post.image}
            checkIsMine={true}
            isDetailPage={true}
          />
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
            fetchHandler={fetchHandler}
          />
        </Wrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 6.4rem;
`;

const List = styled.ul``;

const ListItem = styled.li``;

const Wrapper = styled.ul`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 100%;
  }
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 350;
  font-size: 0.8rem;
  line-height: 1.4rem;
  letter-spacing: -0.01em;
  color: ${COLOR.brown};
`;

export default PostPage;
