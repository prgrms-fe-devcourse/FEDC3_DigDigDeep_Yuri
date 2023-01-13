import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PostResponse, UserResponse } from '../types/response';
import axiosInstance from '../utils/axios';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [userResult, setUserResult] = useState<UserResponse[]>([]);
  const [postResult, setPostResult] = useState<PostResponse[]>([]);
  const getSearch = useCallback(async () => {
    const getType = searchParams.get('type');
    const getSearchTerm = searchParams.get('q');
    if (getType === 'users') {
      const { data } = await axiosInstance.get<UserResponse[]>(
        `/search/users/${getSearchTerm}`
      );
      setUserResult(data);
    }
    if (searchParams.get('type') === 'posts') {
      const { data } = await axiosInstance.get<PostResponse[]>(
        `/search/all/${getSearchTerm}`
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
      SearchPage
      {searchParams.get('type') === 'users' ? (
        <ul>
          {userResult.map((el) => (
            <div key={el._id}>
              <li>{el.image}</li>
              <li>{el.fullName}</li>
            </div>
          ))}
        </ul>
      ) : (
        <ul>
          {postResult.map((el) => (
            <div key={el._id}>
              <li>{JSON.stringify(el.author)}</li>
              <li>{el.author.fullName}</li>
              <li>{el.createdAt}</li>
              <li>{el.title}</li>
              {/* post 컴포넌트 */}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
