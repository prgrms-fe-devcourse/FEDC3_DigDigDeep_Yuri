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
    <>
      <Header />
      <Container>
        <DetailHeader name="내가 좋아한 그라운드" isButton={false} />
        {posts.map((post) => (
          <Post key={post._id} {...post} isMyLikes={true} />
        ))}
        <Spinner loading={loading} />
      </Container>
    </>
  );
};

export default MyLikesPage;

const Container = styled.div`
  display: block;
  margin: 0 auto;
  width: 50%;
  min-width: calc(767px - 10%);
  box-sizing: border-box;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 90%;
    min-width: 90%;
  }
`;
