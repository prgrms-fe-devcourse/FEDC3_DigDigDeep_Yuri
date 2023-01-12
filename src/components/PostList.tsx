import { PostResponse } from '../types/response';
import Post from './Post';

interface Props {
  posts: PostResponse[];
}

const PostList = ({ posts }: Props) => {
  return (
    <ul>
      {posts.map((post) => (
        <Post
          key={post._id}
          _id={post._id}
          title={post.title}
          createdAt={post.createdAt}
          author={post.author}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </ul>
  );
};

export default PostList;
