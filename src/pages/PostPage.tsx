import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ProfileButton from '../components/ProfileButton';
import { userState } from '../recoil/atoms/user';
import { PostResponse } from '../types/response';
import { createComment, deleteComment } from '../utils/comment';
import { sendNotification } from '../utils/notification';
import { deletePost, getPost } from '../utils/post';

type PostId = string;

const PostPage = () => {
  const { postId } = useParams<PostId>();
  const [post, setPost] = useState<PostResponse>();
  const [comment, setComment] = useState('');
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const handleDelete = useCallback(async () => {
    if (postId) {
      if (window.confirm('정말로 삭제하시겠습니다?')) {
        await deletePost(postId);
        navigate('/');
      }
    }
  }, [postId, navigate]);

  const handleEdit = () => {
    navigate(`/edit/${post?._id}`);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    content: string,
    postId: string
  ) => {
    e.preventDefault();
    try {
      const data = await createComment(content, postId);
      if (post) {
        sendNotification('COMMENT', data._id, post.author._id, postId);
      }
      setUser({ ...user, comments: [...user.comments, data] });
      fetchHandler();
      setComment('');
    } catch (error) {
      console.error('댓글 등록에 실패하였습니다.');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setUser({
        ...user,
        comments: user.comments.filter((comment) => comment._id !== commentId),
      });
      fetchHandler();
    } catch (error) {
      console.error(error, '댓글 삭제에 실패하였습니다.');
    }
  };

  const fetchHandler = useCallback(async () => {
    if (postId) {
      try {
        const postDetail = await getPost(postId);
        setPost(postDetail);
      } catch {
        alert('포스트 정보를 불러올 수 없습니다.');
      }
    }
  }, [postId]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  return (
    <div>
      <div>PostPage, postId: {postId}</div>
      <div>
        <Link to="/notifications">
          <button>notification</button>
        </Link>
        <ProfileButton userId={post?.author._id as string}>
          Profile
        </ProfileButton>
      </div>
      {post && (
        <>
          <div>
            <div>{post.title}</div>
            <div>{post.createdAt}</div>
            <div>{post.author.fullName}</div>
            {user._id === post.author._id && (
              <div>
                <button onClick={handleDelete}>삭제</button>
                <button onClick={handleEdit}>수정</button>
              </div>
            )}
          </div>
          <div>likes: {post.likes.length}</div>
          <div>comments: {post.comments.length}</div>
          <button>share</button>
          {post.comments.length ? (
            post.comments.map((comment) => (
              <div key={comment._id}>
                <div>
                  {comment.author.fullName}: {comment.comment}
                </div>
                {comment.author._id === user._id && (
                  <button
                    onClick={() => {
                      handleDeleteComment(comment._id);
                    }}
                  >
                    삭제
                  </button>
                )}
              </div>
            ))
          ) : (
            <div>'댓글이 없습니다.'</div>
          )}
          <form onSubmit={(e) => onSubmit(e, comment, post._id)}>
            <input type="text" value={comment} onChange={onChange} />
            <button>디깅</button>
          </form>
        </>
      )}
    </div>
  );
};

export default PostPage;
