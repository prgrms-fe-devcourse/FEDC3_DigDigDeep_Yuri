import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Post from '../components/Post/Post';
import DetailHeader from '../components/Header/DetailHeader';
import { userState } from '../recoil/atoms/user';
import { PostResponse } from '../types/response';
import { getAllPosts } from '../utils/api/post';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Spinner from '../components/Base/Spinner';

const MyLikesPage = () => {
  const user = useRecoilValue(userState);
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const likedPosts = user.likes
        ?.filter((like) => like.post)
        .map((like) => like.post);
      const posts = await getAllPosts();
      const filteredPosts = posts.filter((post) => {
        return likedPosts.find((like) => {
          return like === post._id;
        });
      });
      setPosts(filteredPosts);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Container>
      <Header />
      <DetailHeader name="내가 좋아한 그라운드" isButton={false} />
      <Wrapper>
        {posts.map((post) => (
          <Post key={post._id} {...post} isMyLikes={true} />
        ))}
        <Spinner loading={loading} />
      </Wrapper>
    </Container>
  );
};

export default MyLikesPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 35%;
  min-width: 350px;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    min-width: 0;
  }
`;
