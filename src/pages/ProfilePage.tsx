import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import PostList from '../components/PostList';
import TabItem from '../components/TabItem';
import UserList from '../components/UserList';
import { userState } from '../recoil/atoms/user';
import { PostResponse, UserResponse } from '../types/response';
import type { FollowResponse } from '../types/user';
import { getUser, getUsers } from '../utils/api/user';
import { COLOR } from '../utils/color';

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
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [userInfo, setUserInfo] = useState<UserResponse>();
  const [followUsersInfo, setFollowUsersInfo] = useState<UserResponse[]>();
  const [activeTab, setActiveTab] = useState<TTabMenuItems>('posts');
  const [posts, setPosts] = useState<PostResponse[]>();
  const [followers, setFollowers] = useState<FollowResponse[]>();
  const [following, setFollowing] = useState<FollowResponse[]>();

  const fetchUser = useCallback(async () => {
    try {
      let data: UserResponse;
      if (userId === 'me') {
        data = user as UserResponse;
      } else {
        data = await getUser(userId as string);
      }
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
        <button onClick={() => navigate('/profile/me/likes')}>MY LIKES</button>
      </div>
      <Header>
        <ImageContainer>
          <Image
            src={userInfo?.image ?? '/image/icon/default-profile.png'}
            alt={userInfo?.fullName}
          />
        </ImageContainer>
        <Name>{userInfo?.fullName}</Name>

        <TabList>
          {TabMenuItems.map((item) => {
            return (
              <TabItemContainer>
                <TabItem
                  key={item}
                  item={item}
                  value={userInfo && userInfo[item].length}
                  isActive={activeTab === item}
                  onClick={() => setActiveTab(item)}
                />
              </TabItemContainer>
            );
          })}
        </TabList>
      </Header>
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
  display: block;
  width: 100%;
  max-width: 1200px;
  background-color: ${COLOR.bgColor};
`;

const TabItemContainer = styled.span`
  display: inline-block;
  width: 33.33%;
  text-align: center;
`;

const TabContent = styled.ul`
  display: block;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 1.5rem;
`;

const ImageContainer = styled.div`
  position: relative;
  display: block;
  aspect-ratio: 1 / 1;
  width: 8rem;
  border-radius: 50%;
  overflow: hidden;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

const Name = styled.h1`
  font-weight: 500;
  font-size: 1.6rem;
  color: ${COLOR.text};
  margin: 1rem 0 2.5rem;
`;
