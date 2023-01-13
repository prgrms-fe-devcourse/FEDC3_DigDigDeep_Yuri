import { PostResponse } from '../types/response';
import Post from './Post';

interface Props {
  posts: PostResponse[];
}

const PostList = ({ posts }: Props) => {
  return (
    <ul>
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </ul>
  );
};

export default PostList;
