import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import FollowButton from '../components/Follow/FollowButton';
import FollowList from '../components/Follow/FollowList';
import PostList from '../components/Post/PostList';
import TabItem from '../components/Profile/TabItem';
import DetailHeader from '../components/Header/DetailHeader';
import { userState } from '../recoil/atoms/user';
import { getUser } from '../utils/api/user';
import COLORS from '../utils/colors';
import Icon from '../components/Base/Icon';
import Header from '../components/Header/Header';
import { ROUTES } from '../utils/routes';
import Image from '../components/Base/Image';
import { queryLowImage } from '../utils/image';
import type { UserResponse } from '../types/api/user';

const defaultProfile = require('../assets/images/icon/default-profile.png');

type TabMenuItem = keyof Pick<
  UserResponse,
  'posts' | 'followers' | 'following'
>;

const tabMenuItems: TabMenuItem[] = ['posts', 'followers', 'following'];

const ProfilePage = () => {
  const { userId } = useParams() as { userId: string };
  const { _id: myId } = useRecoilValue(userState);
  const [userInfo, setUserInfo] = useState<UserResponse>({} as UserResponse);
  const profileImage = useMemo(() => {
    return userInfo.image
      ? queryLowImage(userInfo.image, 'profile')
      : defaultProfile;
  }, [userInfo]);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabMenuItem>('posts');

  const fetchUser = useCallback(async () => {
    const user = await getUser(userId === 'me' ? myId : userId);
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
    <>
      <Header />
      <Wrapper>
        <DetailHeader name="" isButton={false}>
          {userId === 'me' ? (
            <ButtonContainer>
              <Button onClick={() => navigate(ROUTES.PROFILE_ME_LIKES)}>
                <Icon name="my-like" height={22} />
              </Button>
              <Button onClick={() => navigate(ROUTES.PROFILE_ME_EDIT)}>
                <Icon name="setting" height={20} />
              </Button>
            </ButtonContainer>
          ) : (
            <FollowButton targetId={userId} fetchUser={fetchUser} />
          )}
        </DetailHeader>
      </Wrapper>
      <Container>
        <ImageContainer>
          <Image src={profileImage} alt={userInfo?.fullName} />
        </ImageContainer>
        <Name>{userInfo?.fullName}</Name>
        <TabList>
          {tabMenuItems.map((item) => {
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
      </Container>
      <Container>{renderTabContent()}</Container>
    </>
  );
};

export default ProfilePage;

const TabList = styled.div`
  display: flex;
  width: 90%;
  background-color: ${COLORS.bgColor};
  justify-content: space-between;
  margin-top: 2rem;
`;

const TabItemContainer = styled.span`
  display: inline-block;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 35%;
  min-width: 350px;
  margin: 0 auto;
  margin-bottom: 1.5rem;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  overflow: hidden;
`;

const Name = styled.h1`
  font-weight: 500;
  font-size: 1.7rem;
  color: ${COLORS.lightBrown};
  margin: 2rem 0 2.5rem;
`;

const ButtonContainer = styled.div`
  display: block;
`;

const Button = styled.button`
  cursor: pointer;
  display: inline-block;

  :not(:first-child) {
    margin-left: 1.5rem;
  }
`;
