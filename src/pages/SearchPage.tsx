import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../utils/axios';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState([]);
  const getSearch = useCallback(async () => {
    if (searchParams.get('type') === 'users') {
      const { data } = await axiosInstance.get(
        `/search/users/${searchParams.get('q')}`
      );
      setResult(data);
    } else {
      const { data } = await axiosInstance.get(
        `/search/all/${searchParams.get('q')}`
      );
      setResult(data);
    }
  }, [searchParams]);

  useEffect(() => {
    getSearch();
  }, [getSearch]);
  return (
    <div>
      SearchPage, q: {searchParams.get('q')}, type: {searchParams.get('type')}
      <ul>
        result:
        {result.map((el) => (
          <li>el</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
