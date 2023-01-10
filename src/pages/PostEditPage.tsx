import { useParams } from 'react-router-dom';

type PostId = string;

const PostEdit = () => {
  const { postId } = useParams<PostId>();
  return <div>PostEdit, postId: {postId}</div>;
};

export default PostEdit;
