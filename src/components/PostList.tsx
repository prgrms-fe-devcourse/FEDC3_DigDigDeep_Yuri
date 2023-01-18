import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atoms/user';
import { PostResponse } from '../types/response';
import { getPostsByAuthor } from '../utils/post';
import Post from './Post';

interface Props {
  authorId: string;
}

const PostList = ({ authorId }: Props) => {
  const { _id: myId } = useRecoilValue(userState);
  const [posts, setPosts] = useState<PostResponse[]>();
  const checkIsMine = authorId === myId ? true : false;

  const fetchPosts = useCallback(async () => {
    const posts = await getPostsByAuthor(authorId);
    setPosts(posts);
  }, [authorId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, authorId]);

  return (
    <ul>
      {posts &&
        posts.map((post) => (
          <Post key={post._id} checkIsMine={checkIsMine} {...post} />
        ))}
    </ul>
  );
};

export default PostList;
