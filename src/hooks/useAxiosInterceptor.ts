import axiosInstance from '../utils/axios';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../recoil/atoms/user';

const useAxiosInterceptor = () => {
  const token = useRecoilValue(tokenState);

  const requestHandler = axiosInstance.interceptors.request.use(
    (config) => {
      if (config.headers && token) {
        config.headers['Authorization'] = `bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const responseHandler = axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      axiosInstance.interceptors.request.eject(requestHandler);
      axiosInstance.interceptors.response.eject(responseHandler);
    };
  }, [requestHandler, responseHandler]);
};

export default useAxiosInterceptor;
