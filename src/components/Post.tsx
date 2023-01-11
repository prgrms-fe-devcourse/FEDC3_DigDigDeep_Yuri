import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atoms/user';
import { PostResponse } from '../types/response';
import { formatDate } from '../utils/formatDate';
const Post = ({
  _id,
  title,
  createdAt,
  author,
  likes,
  comments,
  ...props
}: PostResponse) => {
  const user = useRecoilValue(userState);

  return (
    <li {...props}>
      <div>Title: {title}</div>
      <div>Created At: {formatDate.fullDate(createdAt)}</div>
      <div>Author: {author.fullName}</div>
      <div>Likes: {likes.length}</div>
      <div>Comments: {comments.length}</div>
      <button>share</button>
      {author._id === user._id && (
        <>
          <button>edit</button>
          <button>delete</button>
        </>
      )}
    </li>
  );
};

export default Post;
