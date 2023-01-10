import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PostResponse } from '../types/response';
import { getPost } from '../utils/post';

type PostId = string;

const PostPage = () => {
  const { postId } = useParams<PostId>();
  const [post, setPost] = useState<PostResponse>();

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
        <Link to="/profile/me">
          <button>profile</button>
        </Link>
      </div>
      {post && (
        <>
          <div>
            <div>{post.title}</div>
            <div>{post.createdAt}</div>
            <div>{post.author.fullName}</div>
            <button>삭제</button>
            <button>수정</button>
          </div>
          <div>likes: {post.likes.length}</div>
          <div>comments: {post.comments.length}</div>
          <button>share</button>
        </>
      )}
    </div>
  );
};

export default PostPage;
