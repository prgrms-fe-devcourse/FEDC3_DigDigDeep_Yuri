import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from '../components/Post';
import Header from '../components/Header';
import { PostResponse } from '../types/response';
import { createPost, getPosts, updatePost } from '../utils/post';
import useLogout from '../hooks/useLogout';
import Searchbar from '../components/Searchbar';

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
      <Searchbar />
      <Ul>
        {posts.map((post) => (
          <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            createdAt={post.createdAt}
            author={post.author}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </Ul>
      {/* 테스트 & 예시 코드입니다. */}
      <button onClick={logout}>로그아웃</button>
      <button
        onClick={async () => {
          await createPost(
            '민재가 하는 테스트',
            null,
            '63b5b86c21d0f92287bd6474'
          );
          const posts = await getPosts();
          setPosts(posts);
        }}
      >
        New Post
      </button>
      <button
        onClick={async () => {
          await updatePost(
            '63bfc1dfec8c5b4385125337',
            '민재가 바꾼 테스트',
            null,
            '63b5b86c21d0f92287bd6474'
          );
          const posts = await getPosts();
          setPosts(posts);
        }}
      >
        Edit Test
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;

const Ul = styled.ul`
  text-align: center;
  margin: 2rem 0;
`;

export default HomePage;
