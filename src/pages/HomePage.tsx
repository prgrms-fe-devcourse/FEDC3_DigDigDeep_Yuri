import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from '../components/Post';
import Header from '../components/Header';
import { PostResponse } from '../types/response';
import { getPosts } from '../utils/post';
import useLogout from '../hooks/useLogout';
import { COLOR } from '../utils/color';

const HomePage = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const logout = useLogout();

  const fetchHandler = useCallback(async () => {
    try {
      const posts = await getPosts();
      setPosts(posts);
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
        {posts.map((post) => (
          <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            createdAt={post.createdAt}
            author={post.author}
            likes={post.likes}
            comments={post.comments}
            image={post.image}
          />
        ))}
      </List>
    </Container>
  );
};

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
  position: relative;
`;

const List = styled.ul`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 90%;
  }
`;

export default HomePage;
