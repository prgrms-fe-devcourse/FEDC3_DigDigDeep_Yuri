import axios from 'axios';
import type { AxiosInstance, RawAxiosRequestHeaders } from 'axios';

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

class Axios {
  private _baseUrl = process.env.REACT_APP_API_BASE_URL;
  private _instance?: AxiosInstance;

  constructor() {
    this._instance = axios.create({
      baseURL: this._baseUrl,
    });

    this._instance?.interceptors.request.use(
      (config) => {
        if (config.headers) {
          const token = localStorage.getItem('token') || '';
          config.headers['Authorization'] = token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this._instance?.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private async request(
    method: Methods,
    url: string,
    data?: {},
    headers?: RawAxiosRequestHeaders
  ) {
    if (!this._instance) {
      throw new Error('axios instance가 생성되지 않았습니다.');
    }
    const result = await this._instance({ method, url, data, headers });
    return result.data;
  }

  public get(url: string) {
    return this.request(Methods.GET, url);
  }

  public post(url: string, data?: {}, headers?: RawAxiosRequestHeaders) {
    return this.request(Methods.POST, url, data, headers);
  }

  public put(url: string, data?: {}, headers?: RawAxiosRequestHeaders) {
    return this.request(Methods.PUT, url, data, headers);
  }

  public delete(url: string) {
    return this.request(Methods.DELETE, url);
  }
}

const axiosInstance = new Axios();

export default axiosInstance;
