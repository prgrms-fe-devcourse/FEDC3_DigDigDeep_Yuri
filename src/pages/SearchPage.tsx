import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../components/Base/Spinner';
import Header from '../components/Header/Header';
import Post from '../components/Post/Post';
import UserItem from '../components/User/UserItem';
import axiosInstance from '../utils/axios';
import COLORS from '../utils/colors';
import { getPost } from '../utils/api/post';
import type { PostResponse } from '../types/api/post';
import type { UserResponse } from '../types/api/user';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [userResult, setUserResult] = useState<UserResponse[]>([]);
  const [postResult, setPostResult] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const toUserProfile = (authorId: string) => {
    navigate(`/profile/${authorId}`);
  };

  const getSearch = useCallback(async () => {
    const getType = searchParams.get('type');
    const getSearchTerm = searchParams.get('q');

    if (getType === 'users') {
      setLoading(true);
      const { data } = await axiosInstance.get<UserResponse[]>(
        `/search/users/${getSearchTerm}`
      );
      setUserResult(data);
      setLoading(false);
    }
    if (searchParams.get('type') === 'posts') {
      setLoading(true);
      const { data } = await axiosInstance.get<PostResponse[]>(
        `/search/all/${getSearchTerm}`
      );
      Promise.all(
        data.reduce<Promise<PostResponse>[]>((prev, post) => {
          if ('author' in post) {
            prev.push(getPost(post._id));
          }
          return prev;
        }, [])
      ).then((data) => setPostResult(data));
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    getSearch();
  }, [getSearch]);

  return (
    <Container>
      <Header />
      {searchParams.get('type') === 'users' ? (
        <List>
          {userResult.map((user) => (
            <UserListItem
              key={user._id}
              onClick={() => toUserProfile(user._id)}
            >
              <UserItem user={user} />
            </UserListItem>
          ))}
        </List>
      ) : postResult.length ? (
        <List>
          {postResult.map((post) => (
            <ListItem key={post._id}>
              <Post {...post} />
            </ListItem>
          ))}
        </List>
      ) : (
        <BigText>검색 결과가 없습니다.</BigText>
      )}
      <Spinner loading={loading} />
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

const UserListItem = styled.li`
  width: 80%;
  margin: 0.5rem auto;
  display: flex;
  align-items: center;
  gap: 1.8rem;
  padding: 1.4rem;
  border-bottom: 0.3px solid ${COLORS.lightGray};
`;

const List = styled.ul`
  width: 35%;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    min-width: 0;
  }
`;

const ListItem = styled.li`
  width: 100%;
  margin: 0.5rem auto;
`;

const BigText = styled.span`
  width: 100%;
  font-weight: 500;
  font-size: 2rem;
  line-height: 4rem;
  letter-spacing: -0.01em;
  color: ${COLORS.lightBrown};
  position: absolute;
  top: 30%;
  text-align: center;
`;
