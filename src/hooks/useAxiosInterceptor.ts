import axiosInstance from '../utils/axios';
import { useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../recoil/atoms/user';
import type { AxiosRequestConfig } from 'axios';
const useAxiosInterceptor = () => {
  const token = useRecoilValue(tokenState);

  const requestHandler = useCallback(
    (config: AxiosRequestConfig) => {
      if (config.headers) {
        config.headers['Authorization'] = '';
        if (token) config.headers['Authorization'] = `bearer ${token}`;
      }
      return config;
    },
    [token]
  );

  useEffect(() => {
    const requestInterceptors =
      axiosInstance.interceptors.request.use(requestHandler);
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptors);
    };
  }, [requestHandler, token]);
};

export default useAxiosInterceptor;
