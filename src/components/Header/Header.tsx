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

  const toggleSearchbar = () => {
    setIsSearchbarShow(!isSearchbarShow);
  };

  const offSearchbar = () => {
    setIsSearchbarShow(false);
  };

  const resizeScreen = () => {
    if (window.innerWidth < 420) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsSearchbarShow(true);
    }
  };

  const checkIsMobile = () => {
    if (window.innerWidth < 420) {
      setIsMobile(true);
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
                  <Button onClick={toggleSearchbar}>
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
                          src={user.image}
                          alt="profile-image"
                          isProfile={true}
                          name="profile"
                          size={24}
                        />
                      ) : (
                        <LinkButton
                          to={ROUTES.PROFILE_ME}
                          name="profile"
                          size={21}
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
                  <Button onClick={toggleSearchbar}>
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
                    <LinkButton to={ROUTES.POSTS_NEW} name="new" size={20} />
                    <LinkButton
                      to={ROUTES.NOTIFICATION}
                      name={isSeen ? 'notification-off' : 'notification-on'}
                      size={20}
                    />
                    {user.image ? (
                      <LinkButton
                        to={ROUTES.PROFILE_ME}
                        src={user.image}
                        alt="profile-image"
                        isProfile={true}
                        name="profile"
                        size={24}
                      />
                    ) : (
                      <LinkButton
                        to={ROUTES.PROFILE_ME}
                        name="profile"
                        size={21}
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
  padding: 3rem 2rem;
  z-index: 1;
  height: 5rem;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 90%;
    display: flex;
    z-index: 1;
    padding: 0 0;
    justify-content: space-between;
    height: 6rem;
    align-items: center;
    border-bottom: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.8rem 0;
  gap: 1rem;
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
  font-weight: 600;
  text-decoration: none;
  line-height: 0.2rem;
  letter-spacing: -0.01em;
  color: ${COLOR.white};
  padding: 1.2rem 1.6rem;
  border-radius: 23.5px;
  border: none;
  margin-left: 1rem;
  min-width: max-content;
  cursor: pointer;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    padding: 1.4rem 1.8rem;
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
  width: 14rem;
  height: 2rem;
  content: url('/image/logo/long.png');

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 4rem;
    height: 4rem;
    content: url('/image/logo/small.png');
  }
`;

export default Header;
