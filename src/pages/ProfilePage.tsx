import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import FollowButton from '../components/Follow/FollowButton';
import FollowList from '../components/Follow/FollowList';
import PostList from '../components/PostList';
import TabItem from '../components/TabItem';
import { userState } from '../recoil/atoms/user';
import { UserResponse } from '../types/response';
import { getUserInfo } from '../utils/api/user';
import { COLOR } from '../utils/color';

export type TTabMenuItems = keyof Pick<
  UserResponse,
  'posts' | 'followers' | 'following'
>;

const TabMenuItems: TTabMenuItems[] = ['posts', 'followers', 'following'];

const ProfilePage = () => {
  const { userId } = useParams() as { userId: string };
  const { _id: myId } = useRecoilValue(userState);
  const [userInfo, setUserInfo] = useState<UserResponse>({} as UserResponse);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TTabMenuItems>('posts');

  const fetchUser = useCallback(async () => {
    const user = await getUserInfo(userId === 'me' ? myId : userId);
    setUserInfo(user);
  }, [userId, myId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostList authorId={userId === 'me' ? myId : userId} />;
      case 'followers':
        return (
          <FollowList
            type="followers"
            follows={userInfo['followers']}
            onUnfollow={fetchUser}
          />
        );
      case 'following':
        return (
          <FollowList
            type="following"
            follows={userInfo['following']}
            onUnfollow={fetchUser}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate('/profile/me/likes')}>MY LIKES</button>{' '}
        | <FollowButton targetId={userId} fetchUser={fetchUser} />
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
              <TabItemContainer key={item}>
                <TabItem
                  item={item}
                  value={userInfo[item] ? userInfo[item].length : 0}
                  isActive={activeTab === item}
                  onClick={() => setActiveTab(item)}
                />
              </TabItemContainer>
            );
          })}
        </TabList>
      </Header>
      <TabContent>{renderTabContent()}</TabContent>
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
