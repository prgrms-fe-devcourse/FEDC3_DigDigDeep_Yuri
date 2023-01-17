import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_BASE_URL
    : '/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
