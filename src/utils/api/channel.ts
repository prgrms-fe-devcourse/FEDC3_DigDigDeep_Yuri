import axiosInstance from '../axios';
import { CHANNEL_NAME } from '../constants';

export const getChannelInfo = async () => {
  const encode = encodeURI(CHANNEL_NAME);
  const { data } = await axiosInstance.get(`/channels/${encode}`);
  return data;
};
