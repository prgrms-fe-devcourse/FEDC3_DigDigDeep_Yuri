import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { tokenState } from '../recoil/atoms/user';
import { COLOR } from '../utils/color';
import Icon from './Base/Icon';
import LinkButton from './LinkButton';
import Searchbar from './Searchbar';

const Header = () => {
  const token = useRecoilValue(tokenState);
  const [isSearchbarShow, setIsSearchbarShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const onScroll = (e: Event) => {
      const handleSetTimeout = setTimeout(() => {
        offSearchbar();
        clearTimeout(handleSetTimeout);
      }, 300);
    };

    checkIsMobile();

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', resizeScreen);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resizeScreen);
    };
  }, []);

  return (
    <HeaderContainer>
      <Container>
        {isMobile ? (
          <>
            {isSearchbarShow ? (
              <SearchWrapper>
                <Searchbar isMobile={isMobile} />
              </SearchWrapper>
            ) : token ? (
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
                  <LinkButton to="/" name="new" size={24} />
                  <LinkButton
                    to="/notifications"
                    name="notification"
                    size={24}
                  />
                  <LinkButton to="/profile/me" name="profile" size={24} />
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
              <Searchbar isMobile={isMobile} />
            </WebSearchWrapper>
            {token ? (
              <Wrapper>
                <LinkButton to="/" name="new" size={20} />
                <LinkButton to="/notifications" name="notification" size={20} />
                <LinkButton to="/profile/me" name="profile" size={20} />
              </Wrapper>
            ) : (
              <Wrapper>
                <LogInButton to="/login">LOG IN</LogInButton>
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

const LogInButton = styled(Link)`
  width: 100%;
  font-weight: 600;
  text-decoration: none;
  line-height: 0.2rem;
  letter-spacing: -0.01em;
  color: ${COLOR.white};
  padding: 1.2rem 1.6rem;
  background-color: ${COLOR.green};
  border-radius: 23.5px;
  border: none;
  margin-left: 1rem;
  min-width: max-content;
  cursor: pointer;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    padding: 1.4rem 1.8rem;
  }
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
