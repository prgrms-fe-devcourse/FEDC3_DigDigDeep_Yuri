import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../../utils/colors';
import Icon from './../Base/Icon';
import Searchbar from './Searchbar';
import ROUTES from '../../utils/routes';
import LinkButtons from './LinkButtons';

const longLogo = require('../../assets/images/logo/long.png');
const smallLogo = require('../../assets/images/logo/small.png');

const Header = () => {
  const [isSearchbarShow, setIsSearchbarShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
        {isSearchbarShow ? (
          <SearchWrapper isMobile={isMobile}>
            <Searchbar
              isMobile={isMobile}
              setIsSearchbarShow={setIsSearchbarShow}
            />
          </SearchWrapper>
        ) : (
          <>
            <Wrapper>
              <LogoButton to={ROUTES.HOME}>
                <LogoWrapper>
                  {window.innerWidth > 767 ? (
                    <Logo src={longLogo} alt="logo" />
                  ) : (
                    <Logo src={smallLogo} alt="logo" />
                  )}
                </LogoWrapper>
              </LogoButton>
              <Button onClick={onSearchbar}>
                <Icon name="search" size={24} />
              </Button>
            </Wrapper>
            <Wrapper>
              <LinkButtons />
            </Wrapper>
          </>
        )}
      </Container>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${COLORS.bgColor};
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

const SearchWrapper = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    isMobile
      ? `width: 100%;
  padding: 1.8rem 0;`
      : `
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 3rem;
  `}
`;

const Button = styled.div`
  cursor: pointer;
`;

const LogoButton = styled(Link)``;

const LogoWrapper = styled.span``;

const Logo = styled.img`
  width: 15rem;
  height: 100%;
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
