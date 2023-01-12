import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import PostList from '../components/PostList';
import Tab from '../components/Tab';
import UserList from '../components/UserList';
import { userState } from '../recoil/atoms/user';
import { PostResponse, UserResponse } from '../types/response';
import type { FollowResponse } from '../types/user';
import { getUser, getUsers } from '../utils/api/user';
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

export type TTabMenuItems = keyof Pick<
  UserResponse,
  'posts' | 'followers' | 'following'
>;

const TabMenuItems: TTabMenuItems[] = ['posts', 'followers', 'following'];

const ProfilePage = () => {
  const { userId } = useParams();
  const user = useRecoilValue(userState);
  const [userInfo, setUserInfo] = useState<UserResponse>();
  const [followUsersInfo, setFollowUsersInfo] = useState<UserResponse[]>();
  const [activeTab, setActiveTab] = useState<TTabMenuItems>('posts');
  const [posts, setPosts] = useState<PostResponse[]>();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const fetchUser = useCallback(async () => {
    try {
      const requestId = userId === 'me' ? user._id : userId;
      const data = await getUser(requestId as string);
      setUserInfo(data);
      setPosts(data.posts);
      setFollowers(data.followers);
      setFollowing(data.following);
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
  }, [fetchFollowUsers, fetchUser]);

  return (
    <div>
      <div>
        <img src={userInfo?.image} alt={userInfo?.fullName} />
        <h1>{userInfo?.fullName}</h1>
        <p>member since {userInfo && formatDate.year(userInfo.createdAt)}</p>
      </div>
      <TabList>
        {TabMenuItems.map((item) => {
          return (
            <Tab
              key={item}
              item={item}
              value={userInfo && userInfo[item].length}
              isActive={activeTab === item}
              onClick={() => setActiveTab(item)}
            />
          );
        })}
      </TabList>
      <TabContent>
        {activeTab === 'posts' && posts && <PostList posts={posts} />}
        {activeTab === 'following' && following && (
          <UserList users={followUsersInfo!} unfollowable={true} />
        )}
        {activeTab === 'followers' && followers && (
          <UserList users={followUsersInfo!} unfollowable={false} />
        )}
      </TabContent>
    </div>
  );
};

export default ProfilePage;

const TabList = styled.div`
  display: flex;
`;

const TabContent = styled.ul`
  display: block;
`;
