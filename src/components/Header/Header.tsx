import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import useLogout from '../../hooks/useLogout';
import useModal from '../../hooks/useModal';
import useToast from '../../hooks/useToast';
import { tokenState, userState } from '../../recoil/atoms/user';
import { COLOR } from '../../utils/color';
import Icon from './../Base/Icon';
import LinkButton from '../Button/LinkButton';
import Searchbar from './Searchbar';
import useNotification from '../../hooks/useNotification';
import { ROUTES } from '../../utils/routes';
import { CONFIRM_MESSAGES, ERROR_MESSAGES } from '../../utils/messages';
import { queryLowImage } from '../../utils/image';

const longLogo = require('../../assets/images/logo/long.png');
const smallLogo = require('../../assets/images/logo/small.png');

const Header = () => {
  const token = useRecoilValue(tokenState);
  const user = useRecoilValue(userState);
  const location = useLocation();
  const [isSearchbarShow, setIsSearchbarShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { isSeen } = useNotification();
  const logout = useLogout();
  const { showModal } = useModal();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const isMe = location.pathname.split('/').includes('me');

  const onSearchbar = () => {
    setIsSearchbarShow(true);
  };

  const offSearchbar = () => {
    setIsSearchbarShow(false);
  };

  const resizeScreen = () => {
    if (window.innerWidth < 545) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsSearchbarShow(false);
    }
  };

  const checkIsMobile = () => {
    if (window.innerWidth < 545) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const handleLogout = async () => {
    if (!token) return;

    showModal({
      message: CONFIRM_MESSAGES.LOGOUT_CONFIRM,
      handleConfirm: async () => {
        try {
          navigate(ROUTES.HOME);
          await logout();
        } catch (error) {
          console.error(error);
          showToast({ message: ERROR_MESSAGES.SERVER_ERROR });
        }
      },
    });
  };

  const handleChange = useCallback(() => {
    const handleSetTimeout = setTimeout(() => {
      offSearchbar();
      clearTimeout(handleSetTimeout);
    }, 300);
  }, []);

  useEffect(() => {
    checkIsMobile();

    window.addEventListener('scroll', handleChange);
    window.addEventListener('resize', resizeScreen);
    return () => {
      window.removeEventListener('scroll', handleChange);
      window.removeEventListener('resize', resizeScreen);
    };
  }, [handleChange]);
  return (
    <HeaderContainer>
      <Container>
        {isMobile ? (
          <>
            {isSearchbarShow ? (
              <SearchWrapper>
                <Searchbar
                  isMobile={isMobile}
                  setIsSearchbarShow={setIsSearchbarShow}
                />
              </SearchWrapper>
            ) : token ? (
              <>
                <Wrapper>
                  <LogoButton to={ROUTES.HOME}>
                    <Logo />
                  </LogoButton>
                  <Button onClick={onSearchbar}>
                    <Icon name="search" size={24} />
                  </Button>
                </Wrapper>
                <Wrapper>
                  {isMe ? (
                    <LogOutButton onClick={handleLogout}>LOGOUT</LogOutButton>
                  ) : (
                    <>
                      <LinkButton to={ROUTES.POSTS_NEW} name="new" size={24} />
                      <LinkButton
                        to={ROUTES.NOTIFICATION}
                        name={isSeen ? 'notification-off' : 'notification-on'}
                        size={24}
                      />
                      {user.image ? (
                        <LinkButton
                          to={ROUTES.PROFILE_ME}
                          src={queryLowImage(user.image, 'profile')}
                          alt="profile-image"
                          isProfile={true}
                          name="profile"
                          size={24}
                        />
                      ) : (
                        <LinkButton
                          to={ROUTES.PROFILE_ME}
                          name="profile"
                          size={24}
                        />
                      )}
                    </>
                  )}
                </Wrapper>
              </>
            ) : (
              <>
                <Wrapper>
                  <LogoButton to="/">
                    <Logo />
                  </LogoButton>
                  <Button onClick={onSearchbar}>
                    <Icon name="search" size={24} />
                  </Button>
                </Wrapper>
                <Wrapper>
                  <Wrapper>
                    <LogInButton to="/login">LOG IN</LogInButton>
                  </Wrapper>
                </Wrapper>
              </>
            )}
          </>
        ) : (
          <>
            <WebSearchWrapper>
              <LogoButton to="/">
                <Logo />
              </LogoButton>
              <Searchbar
                isMobile={isMobile}
                setIsSearchbarShow={setIsSearchbarShow}
              />
            </WebSearchWrapper>
            {token ? (
              <Wrapper>
                {isMe ? (
                  <LogOutButton onClick={handleLogout}>LOGOUT</LogOutButton>
                ) : (
                  <>
                    <LinkButton to={ROUTES.POSTS_NEW} name="new" size={24} />
                    <LinkButton
                      to={ROUTES.NOTIFICATION}
                      name={isSeen ? 'notification-off' : 'notification-on'}
                      size={24}
                    />
                    {user.image ? (
                      <LinkButton
                        to={ROUTES.PROFILE_ME}
                        src={queryLowImage(user.image, 'profile')}
                        alt="profile-image"
                        isProfile={true}
                        name="profile"
                        size={24}
                      />
                    ) : (
                      <LinkButton
                        to={ROUTES.PROFILE_ME}
                        name="profile"
                        size={24}
                      />
                    )}
                  </>
                )}
              </Wrapper>
            ) : (
              <Wrapper>
                <LogInButton to={ROUTES.LOGIN}>LOG IN</LogInButton>
              </Wrapper>
            )}
          </>
        )}
      </Container>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${COLOR.bgColor};
  position: sticky;
  z-index: 1;
  top: 0;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 3rem 2.7rem;
  z-index: 1;
  height: 5rem;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    display: flex;
    z-index: 1;
    padding: 0 2rem;
    justify-content: space-between;
    height: 6rem;
    align-items: center;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.8rem 1rem;
  gap: 2rem;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    gap: 1.5rem;
  }
`;

const WebSearchWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 3rem;
`;

const SearchWrapper = styled.div`
  width: 100%;
  padding: 1.8rem 0;
`;

const LinkContainer = css`
  width: 100%;
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: -0.01em;
  color: ${COLOR.white};
  padding: 1.3rem 2rem;
  border-radius: 23.5px;
  border: none;
  min-width: max-content;
  cursor: pointer;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    padding: 1.2rem 1.8rem;
  }
`;

const LogInButton = styled(Link)`
  background-color: ${COLOR.green};
  ${LinkContainer}
`;

const LogOutButton = styled.button`
  color: ${COLOR.white};
  background-color: ${COLOR.lightGray};
  ${LinkContainer}
`;

const Button = styled.div`
  cursor: pointer;
`;

const LogoButton = styled(Link)``;

const Logo = styled.img`
  height: 2.4rem;
  content: url(${longLogo});
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 3.4rem;
    height: 3.4rem;
    content: url(${smallLogo});
  }
`;

export default Header;
