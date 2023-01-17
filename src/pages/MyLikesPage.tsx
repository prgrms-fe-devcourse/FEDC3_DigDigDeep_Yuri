import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Post from '../components/Post';
import { userState } from '../recoil/atoms/user';
import { PostResponse } from '../types/response';
import { getPosts } from '../utils/post';

const MyLikesPage = () => {
  const user = useRecoilValue(userState);
  const [posts, setPosts] = useState<PostResponse[]>([]);

  const fetchPosts = useCallback(async () => {
    try {
      const likedPosts = user.likes
        ?.filter((like) => like.post)
        .map((like) => like.post);
      const posts = await getPosts();
      const filteredPosts = posts.filter((post) => {
        return likedPosts.find((like) => {
          return like === post._id;
        });
      });
      setPosts(filteredPosts);
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div>
      <h2>MyLikesPage</h2>
      {posts.map((post) => (
        <Post
          key={post._id}
          _id={post._id}
          title={post.title}
          createdAt={post.createdAt}
          author={post.author}
          likes={post.likes}
          comments={post.comments}
          image={post.image}
        />
      ))}
    </div>
  );
};

export default MyLikesPage;
