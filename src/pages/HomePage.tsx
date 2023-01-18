import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Post from '../components/Post';
import Header from '../components/Header';
import { PostResponse } from '../types/response';
import { getPosts } from '../utils/post';
import useLogout from '../hooks/useLogout';
import { COLOR } from '../utils/color';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const HomePage = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [currentPosts, setCurrnetPosts] = useState<PostResponse[]>([]);
  const postsLength = useMemo(() => posts.length, [posts]);
  const logout = useLogout();

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
      const posts = await getPosts();
      setPosts(posts);
      setCurrnetPosts(posts.slice(0, 10));
    } catch {
      alert('포스트 정보를 불러올 수 없습니다.');
    }
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  return (
    <Container>
      <Header />
      <LogOutButton onClick={logout}>로그아웃</LogOutButton>
      <List>
        {currentPosts.map((post) => (
          <ListItem key={post._id}>
            <Post {...post} />
            <ObservedDiv ref={setTarget}></ObservedDiv>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

const ObservedDiv = styled.div``;

const LogOutButton = styled.div`
  margin: 0 auto;
  padding: 2rem 3rem;
  background-color: ${COLOR.text};
  color: ${COLOR.white};
  border-radius: 2rem;
  width: 2.4%;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 10%;
  }
`;

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
