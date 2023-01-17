import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Post from '../components/Post';
import { PostResponse, UserResponse } from '../types/response';
import axiosInstance from '../utils/axios';
import { COLOR } from '../utils/color';
import { getPost } from '../utils/post';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [userResult, setUserResult] = useState<UserResponse[]>([]);
  const [postResult, setPostResult] = useState<PostResponse[]>([]);

  const getSearch = useCallback(async () => {
    const getType = searchParams.get('type');
    const getSearchTerm = searchParams.get('q');

    if (getType === 'users') {
      const { data } = await axiosInstance.get<UserResponse[]>(
        `/search/users/${getSearchTerm}`
      );
      setUserResult(data);
    }
    if (searchParams.get('type') === 'posts') {
      const { data } = await axiosInstance.get<PostResponse[]>(
        `/search/all/${getSearchTerm}`
      );
      const postOnly = data.filter((el) => 'author' in el);
      const posts = postOnly.map((post) => getPost(post._id));
      Promise.all(posts).then((data) => setPostResult(data));
    }
  }, [searchParams]);

  useEffect(() => {
    getSearch();
  }, [getSearch]);

  return (
    <Container>
      <Header />
      {searchParams.get('type') === 'users' ? (
        <ul>
          {userResult.map((el) => (
            <div key={el._id}>
              <li>{el.image}</li>
              <li>{el.fullName}</li>
            </div>
          ))}
        </ul>
      ) : postResult.length ? (
        <List>
          {postResult.map((post) => (
            <ListItem key={post._id}>
              <Post {...post} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Text>검색 결과가 없습니다.</Text>
      )}
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
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

const ListItem = styled.li`
  width: 100%;
  margin: 0.5rem auto;
`;

const Text = styled.span`
  width: 100%;
  font-weight: 500;
  font-size: 2rem;
  line-height: 4rem;
  letter-spacing: -0.01em;
  color: ${COLOR.lightBrown};
  position: absolute;
  top: 30%;
  text-align: center;
`;
