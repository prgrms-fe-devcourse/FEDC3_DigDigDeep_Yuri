import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import FollowButton from '../components/Follow/FollowButton';
import FollowList from '../components/Follow/FollowList';
import PostList from '../components/PostList';
import TabItem from '../components/TabItem';
import DetailHeader from '../components/DetailHeader';
import { userState } from '../recoil/atoms/user';
import { UserResponse } from '../types/response';
import { getUserInfo } from '../utils/api/user';
import { COLOR } from '../utils/color';
import Icon from '../components/Base/Icon';
import Header from '../components/Header';

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
    <>
      <Header />
      <Wrapper>
        <DetailHeader name="" isButton={false}>
          {userId === 'me' ? (
            <ButtonContainer>
              <Button onClick={() => navigate('/profile/me/likes')}>
                <Icon name="my-like" height={22} />
              </Button>
              <Button onClick={() => navigate('/profile/me/edit')}>
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
      </Container>
      <Container>{renderTabContent()}</Container>
    </>
  );
};

export default ProfilePage;

const TabList = styled.div`
  display: flex;
  width: 100%;
  background-color: ${COLOR.bgColor};
  justify-content: space-between;
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
  width: 50%;
  min-width: calc(767px - 10%);
  margin: 0 auto;
  margin-bottom: 1.5rem;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 90%;
    min-width: 90%;
  }
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
