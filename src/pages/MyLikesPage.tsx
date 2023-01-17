import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Post from '../components/Post';
import DetailHeader from '../components/DetailHeader';
import { userState } from '../recoil/atoms/user';
import { PostResponse } from '../types/response';
import { getPosts } from '../utils/post';
import styled from 'styled-components';

const MyLikesPage = () => {
  const user = useRecoilValue(userState);
  const [posts, setPosts] = useState<PostResponse[]>([]);

  const fetchPosts = useCallback(async () => {
    try {
      const likedPosts = user.likes
        ?.filter((like) => like.post)
        .map((like) => like.post);
      const posts = await getPosts();
      const filteredPosts = posts.filter((post) => {
        return likedPosts.find((like) => {
          return like === post._id;
        });
      });
      setPosts(filteredPosts);
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Container>
      <DetailHeader title="내가 좋아한 그라운드" isButton={false} />
      {posts.map((post) => (
        <Post key={post._id} isMyLikes={true} {...post} />
      ))}
    </Container>
  );
};

export default MyLikesPage;

const Container = styled.div`
  display: block;
  margin: 0 auto;
  padding: 0 3rem;
  width: 50%;
  min-width: 767px;
  box-sizing: border-box;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    min-width: 100%;
  }
`;
