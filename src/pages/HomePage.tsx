import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Post from '../components/Post/Post';
import Header from '../components/Header/Header';
import { PostResponse } from '../types/response';
import { getPosts } from '../utils/api/post';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Spinner from '../components/Base/Spinner';
import { ERROR_MESSAGES } from '../utils/messages';
import useToast from '../hooks/useToast';

const HomePage = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [currentPosts, setCurrnetPosts] = useState<PostResponse[]>([]);
  const postsLength = useMemo(() => posts.length, [posts]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    let offset = currentPosts.length;
    if (postsLength < offset) return;
    if (isIntersecting) {
      const slicedPost = posts.slice(offset, offset + 10);
      setCurrnetPosts([...currentPosts, ...slicedPost]);
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  const fetchHandler = useCallback(async () => {
    try {
      setLoading(true);
      const posts = await getPosts();
      setPosts(posts);
      setCurrnetPosts(posts.slice(0, 10));
      setLoading(false);
    } catch {
      showToast({ message: ERROR_MESSAGES.GET_ERROR('포스트를') });
    }
  }, [showToast]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  return (
    <Container>
      <Header />
      <List>
        {currentPosts.map((post) => (
          <ListItem key={post._id}>
            <Post {...post} />
            <ObservedDiv ref={setTarget}></ObservedDiv>
          </ListItem>
        ))}
      </List>
      <Spinner loading={loading} />
    </Container>
  );
};

const ObservedDiv = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;

const List = styled.ul`
  width: 50%;
  min-width: calc(767px - 10%);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  box-sizing: border-box;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 90%;
    min-width: 90%;
  }
`;

const ListItem = styled.li`
  width: 100%;
  margin: 0.5rem auto;
`;

export default HomePage;
