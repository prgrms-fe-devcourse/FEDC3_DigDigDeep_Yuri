import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from '../components/Post/Post';
import Header from '../components/Header/Header';
import { getPosts } from '../utils/api/post';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { getChannelInfo } from '../utils/api/channel';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../recoil/atoms/loading';
import { ERROR_MESSAGES } from '../utils/messages';
import useToast from '../hooks/useToast';
import GlobalSpinner from '../components/Base/GlobalSpinner';
import type { PostResponse } from '../types/api/post';

const HomePage = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [postLength, setPostLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const setLoading = useSetRecoilState(loadingState);
  const { showToast } = useToast();

  const onIntersect: IntersectionObserverCallback = async ([
    { isIntersecting },
  ]) => {
    if (postLength <= offset) return;
    if (isIntersecting) {
      getMorePost();
    }
  };

  const getMorePost = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await getPosts(10, offset);
      setPosts([...posts, ...fetchedPosts]);
      setOffset(offset + 10);
      setLoading(false);
    } catch {
      alert('포스트 정보를 불러올 수 없습니다.');
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  const getPostsLength = useCallback(async () => {
    const data = await getChannelInfo();
    setPostLength(data.posts ? data.posts.length : 0);
  }, []);

  const fetchHandler = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedPosts = await getPosts(10, 0);
      setPosts(fetchedPosts);
      setOffset(10);
      setLoading(false);
    } catch {
      showToast({ message: ERROR_MESSAGES.GET_ERROR('포스트를') });
    }
  }, [showToast, setLoading]);

  useEffect(() => {
    getPostsLength();
    fetchHandler();
  }, [getPostsLength, fetchHandler]);

  return (
    <Container>
      <Header />
      <List>
        {posts.map((post) => (
          <ListItem key={post._id}>
            <Post {...post} />
            <ObservedDiv ref={setTarget}></ObservedDiv>
          </ListItem>
        ))}
      </List>
      <GlobalSpinner />
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
  width: 35%;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  box-sizing: border-box;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    min-width: 0;
  }
`;

const ListItem = styled.li`
  width: 100%;
  margin: 0.5rem auto;
`;

export default HomePage;
