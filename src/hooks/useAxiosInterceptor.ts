import axiosInstance from '../utils/axios';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../recoil/atoms/user';
import type { AxiosRequestConfig } from 'axios';
const useAxiosInterceptor = () => {
  const token = useRecoilValue(tokenState);

  const requestHandler = (config: AxiosRequestConfig) => {
    if (config.headers && token) {
      config.headers['Authorization'] = `bearer ${token}`;
    }
    return config;
  };

  const requestInterceptors =
    axiosInstance.interceptors.request.use(requestHandler);

  useEffect(() => {
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptors);
    };
  }, [requestInterceptors]);
};

export default useAxiosInterceptor;
