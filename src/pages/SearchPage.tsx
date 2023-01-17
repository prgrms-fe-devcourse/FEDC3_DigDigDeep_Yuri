import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../components/Base/Icon';
import Header from '../components/Header';
import Post from '../components/Post';
import { PostResponse, UserResponse } from '../types/response';
import axiosInstance from '../utils/axios';
import { COLOR } from '../utils/color';
import { getPost } from '../utils/post';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [userResult, setUserResult] = useState<UserResponse[]>([]);
  const [postResult, setPostResult] = useState<PostResponse[]>([]);

  const toUserProfile = (authorId: string) => {
    navigate(`/profile/${authorId}`);
  };

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
        <List>
          {userResult.map((user) => (
            <UserListItem
              key={user._id}
              onClick={() => toUserProfile(user._id)}
            >
              {user.image ? (
                <Image src={user.image} />
              ) : (
                <Icon name="default-profile" size={38} />
              )}
              <Text>
                <Strong>{user.fullName}</Strong>
              </Text>
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

const Strong = styled.strong`
  font-weight: 700;
`;

const UserListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1.8rem;
  padding: 1.4rem;
  border-bottom: 0.3px solid ${COLOR.lightGray};
`;

const Image = styled.img`
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 50%;
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
  font-weight: 350;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.01em;
  color: #715141;
`;

const BigText = styled.span`
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
