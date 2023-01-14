import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import FollowButton from '../components/FollowButton';
import PostList from '../components/PostList';
import TabItem from '../components/TabItem';
import UserList from '../components/UserList';
import { userState } from '../recoil/atoms/user';
import { PostResponse, UserResponse, FollowResponse } from '../types/response';
import { getUser } from '../utils/api/user';
import { formatDate } from '../utils/formatDate';

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
  const [followUsersInfo, setFollowUsersInfo] = useState<UserResponse[]>([]);
  const [activeTab, setActiveTab] = useState<TTabMenuItems>('posts');
  const [posts, setPosts] = useState<PostResponse[]>([]);
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
      alert('사용자 정보 호출 중 에러가 발생했습니다.');
      console.error(err);
    }
  }, [user, userId]);

  const fetchFollows = useCallback(
    async (followUsers: FollowResponse[], type: string) => {
      try {
        const data = followUsers.map(async (follow) => {
          if (type === 'followers') {
            return await getUser(follow.follower);
          }
          if (type === 'following') {
            return await getUser(follow.user);
          }
        });
        Promise.all(data).then((res) => setFollowUsersInfo(res as []));
      } catch (err) {
        console.error(err);
      }
    },
    []
  );

  const handleTabChange = (item: TTabMenuItems) => {
    setActiveTab(item);
    if (item === 'posts') return;
    if (item === 'followers') {
      followers && fetchFollows(followers, 'followers');
    }
    if (item === 'following') {
      following && fetchFollows(following, 'following');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div>
      <ProfileUtils>
        {userId === 'me' ? (
          <button onClick={() => navigate('/profile/me/likes')}>
            MY LIKES
          </button>
        ) : (
          <FollowButton />
        )}
      </ProfileUtils>
      <div>
        {userInfo && (
          <>
            <img src={userInfo.image} alt={userInfo.fullName} />
            <h1>{userInfo.fullName}</h1>
            <p>member since {formatDate.year(userInfo.createdAt)}</p>
          </>
        )}
      </div>
      <TabList>
        {TabMenuItems.map((item) => {
          return (
            <TabItem
              key={item}
              item={item}
              value={userInfo && userInfo[item].length}
              isActive={activeTab === item}
              onClick={() => handleTabChange(item)}
            />
          );
        })}
      </TabList>
      <TabContent>
        {activeTab === 'posts' && <PostList posts={posts} />}
        {activeTab === 'following' && (
          <UserList users={followUsersInfo} unfollowable={true} />
        )}
        {activeTab === 'followers' && (
          <UserList users={followUsersInfo} unfollowable={false} />
        )}
      </TabContent>
    </div>
  );
};

export default ProfilePage;

const ProfileUtils = styled.div`
  display: flex;
`;

const TabList = styled.div`
  display: flex;
`;

const TabContent = styled.ul`
  display: block;
`;
