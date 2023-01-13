import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PostResponse } from '../types/response';
import type { User } from '../types/user';
import axiosInstance from '../utils/axios';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [userResult, setUserResult] = useState<User[]>([]);
  const [postResult, setPostResult] = useState<PostResponse[]>([]);
  const getSearch = useCallback(async () => {
    if (searchParams.get('type') === 'users') {
      const { data } = await axiosInstance.get<User[]>(
        `/search/users/${searchParams.get('q')}`
      );
      setUserResult(data);
    } else {
      const { data } = await axiosInstance.get<PostResponse[]>(
        `/search/all/${searchParams.get('q')}`
      );
      const postOnly = data.filter((el) => 'author' in el);
      setPostResult(postOnly);
    }
  }, [searchParams]);

  useEffect(() => {
    getSearch();
  }, [getSearch]);

  return (
    <div>
      SearchPage, q: {searchParams.get('q')}, type: {searchParams.get('type')}
      <ul>
        {searchParams.get('type') === 'users' ? (
          <li>{userResult.map((el) => el.fullName)}</li>
        ) : (
          <li>{postResult.map((el) => el.title)}</li>
        )}
      </ul>
    </div>
  );
};

export default SearchPage;
