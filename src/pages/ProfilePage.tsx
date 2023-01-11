import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import User from '../components/User';
import { userState } from '../recoil/atoms/user';
import type { FollowResponse, UserResponse } from '../types/user';
import { getUser, getUsers } from '../utils/api/user';
import axiosInstance from '../utils/axios';
import { formatDate } from '../utils/formatDate';

const testFollowers = [
  {
    createdAt: '2023-01-10T08:42:37.943Z',
    updatedAt: '2023-01-10T08:42:37.943Z',
    __v: 0,
    _id: '63bd24fd4b0e607612a82bf0',
  },
  {
    createdAt: '2023-01-10T08:42:37.943Z',
    updatedAt: '2023-01-10T08:42:37.943Z',
    __v: 0,
    _id: '63bd22a14b0e607612a82b98',
  },
  {
    createdAt: '2023-01-10T08:42:37.943Z',
    updatedAt: '2023-01-10T08:42:37.943Z',
    __v: 0,
    _id: '63bd1ffa4b0e607612a82b35',
  },
];


const ProfilePage = () => {
  const { userId } = useParams();
  const user = useRecoilValue(userState);
  const [userInfo, setUserInfo] = useState<UserResponse>();
  const [followUsersInfo, setFollowUsersInfo] = useState<UserResponse[]>();

  const fetchUser = useCallback(async () => {
    try {
      const requestId = userId === 'me' ? user._id : userId;
      const data = await getUser(requestId as string);
      setUserInfo(data);
    } catch (err) {
      console.error(err);
    }
  }, [user, userId]);

  const fetchFollowUsers = useCallback(async (followUser: FollowResponse[]) => {
    try {
      const data = await getUsers();
      const filteredUsers = data.filter((user) => {
        return followUser.find((follow) => {
          return follow._id === user._id;
        });
      });
      setFollowUsersInfo(filteredUsers);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    fetchFollowUsers(testFollowers);
  }, [testFollowers]);

  return (
    <div>
      <div>
        <img src={userInfo?.image} alt={userInfo?.fullName} />
        <h1>{userInfo?.fullName}</h1>
        <p>member since {userInfo && formatDate.year(userInfo.createdAt)}</p>
      </div>
      <TabItemArea>
        <ul>
          {followUsersInfo &&
            followUsersInfo.map((follow) => (
              <User key={follow._id} userInfo={follow} unfollowable={true} />
            ))}
        </ul>
      </TabItemArea>
    </div>
  );
};

export default ProfilePage;
const TabItemArea = styled.div`
  display: block;
`;
