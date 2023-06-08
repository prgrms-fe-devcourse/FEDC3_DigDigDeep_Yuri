import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userState } from '../../recoil/atoms/user';
import { getPostsByAuthor } from '../../utils/api/post';
import Post from './Post';
import COLORS from '../../utils/colors';
import type { PostResponse } from '../../types/api/post';

interface Props {
  authorId: string;
}

const PostList = ({ authorId }: Props) => {
  const { _id: myId } = useRecoilValue(userState);
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const checkIsMine = authorId === myId ? true : false;

  const fetchPosts = useCallback(async () => {
    const posts = await getPostsByAuthor(authorId);
    setPosts(posts);
  }, [authorId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, authorId]);

  if (posts.length === 0) return <Text>생성된 그라운드가 없습니다.</Text>;

  return (
    <UnorderedList>
      {posts.map((post) => (
        <Post key={post._id} checkIsMine={checkIsMine} {...post} />
      ))}
    </UnorderedList>
  );
};

export default PostList;

const UnorderedList = styled.ul`
  width: 100%;
`;

const Text = styled.h3`
  margin-top: 4rem;
  font-weight: 400;
  font-size: 1.5rem;
  text-align: center;
  color: ${COLORS.brownGray};
`;
