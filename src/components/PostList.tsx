import { useCallback, useEffect, useState } from 'react';
import { PostResponse } from '../types/response';
import { getPostsByAuthor } from '../utils/post';
import Post from './Post';

interface Props {
  authorId: string;
}

const PostList = ({ authorId }: Props) => {
  const [posts, setPosts] = useState<PostResponse[]>();

  const fetchPosts = useCallback(async () => {
    const posts = await getPostsByAuthor(authorId);
    setPosts(posts);
  }, [authorId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, authorId]);

  return (
    <ul>{posts && posts.map((post) => <Post key={post._id} {...post} />)}</ul>
  );
};

export default PostList;
