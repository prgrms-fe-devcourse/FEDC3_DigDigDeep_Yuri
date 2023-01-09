import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PostResponse } from '../types/response';
import axiosInstance from '../utils/axios';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('all');
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const navigate = useNavigate();

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

  const getPosts = useCallback(async () => {
    // 10개만 offset으로 무한스크롤 구현 가능
    const { data } = await axiosInstance.get<PostResponse[]>(`/posts?limit=10`);
    setPosts(data);
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

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
        {posts.map((el) => (
          <li key={el._id}>
            <div>{el.title}</div>
            <div>{el.createdAt}</div>
            <div>{el.author.fullName}</div>
            <div>likes: {el.likes.length}</div>
            <div>comments: {el.comments.length}</div>
            <button>share</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
