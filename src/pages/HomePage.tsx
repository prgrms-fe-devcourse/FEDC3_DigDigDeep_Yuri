import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import useLogout from '../hooks/useLogout';
import { PostResponse } from '../types/response';
import { getPosts } from '../utils/post';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('all');
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const navigate = useNavigate();
  const logout = useLogout();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?q=${search}&type=${select}`);
  };

  const clickHandler = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  const fetchHandler = useCallback(async () => {
    try {
      const posts = await getPosts();
      setPosts(posts);
    } catch {
      alert('포스트 정보를 불러올 수 없습니다.');
    }
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  return (
    <div>
      <div>
        <button>new post</button>
        <Link to="/notifications">
          <button>notification</button>
        </Link>
        <Link to="/profile/me">
          <button>profile</button>
        </Link>
        <button onClick={logout}>logout</button>
      </div>
      <form onSubmit={onSubmit}>
        <select onChange={handleSelect}>
          <option value="all">post + user</option>
          <option value="users">users</option>
        </select>
        <input type="search" value={search} onChange={onChange} />
        <button type="submit">Search</button>
      </form>
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
    </div>
  );
};

export default HomePage;
