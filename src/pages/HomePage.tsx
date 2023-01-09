import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('all');
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
      {select}
    </div>
  );
};

export default HomePage;
