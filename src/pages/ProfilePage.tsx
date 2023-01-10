import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atoms/user';
import type { UserResponse } from '../types/user';
import axiosInstance from '../utils/axios';

const ProfilePage = () => {
  const { userId } = useParams();
  const user = useRecoilValue(userState);
  const [userInfo, setUserInfo] = useState<UserResponse>();

  const getUser = useCallback(async () => {
    const requestId = userId === 'me' ? user._id : userId;
    try {
      const { data } = await axiosInstance.get<UserResponse>(
        `/users/${requestId}`
      );
      setUserInfo(data);
    } catch (err) {
      console.error(err);
    }
  }, [user, userId]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div>
        <img src={userInfo?.image} alt={userInfo?.fullName} />
        <h1>{userInfo?.fullName}</h1>
        <p>member since {userInfo?.createdAt.slice(0, 4)}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
