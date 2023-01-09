import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { postId } = useParams();
  return <div>PostPage, postId: {postId}</div>;
};

export default PostPage;
