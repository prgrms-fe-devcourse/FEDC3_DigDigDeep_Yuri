import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { tokenState } from '../recoil/atoms/user';
import { COLOR } from '../utils/color';
import Icon from './Base/Icon';
import LinkButton from './LinkButton';

const Header = () => {
  const token = useRecoilValue(tokenState);

  return (
    <Container>
      <Wrapper>
        <LogoButton to="/">
          <Logo />
        </LogoButton>
        <Icon name="search" size={24} />
      </Wrapper>
      {token ? (
        <Wrapper>
          <LinkButton to="/" name="new" size={24} />
          <LinkButton to="/notifications" name="notification" size={24} />
          <LinkButton to="/profile/me" name="profile" size={24} />
        </Wrapper>
      ) : (
        <Wrapper>
          <LogInButton to="/login">LOG IN</LogInButton>
        </Wrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  height: 6rem;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${COLOR.bgColor};
  /* border-bottom: 1px solid #eeeeee; */
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1.8rem 0;
  gap: 1.5rem;
`;

const LogInButton = styled(Link)`
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  text-decoration: none;
  line-height: 0.2rem;
  letter-spacing: -0.01em;
  color: ${COLOR.white};
  padding: 1.4rem 1.8rem;
  background-color: ${COLOR.green};
  border-radius: 23.5px;
  border: none;
  cursor: pointer;
`;

const LogoButton = styled(Link)``;

const Logo = styled.img`
  width: 4rem;
  height: 4rem;
  content: url('/image/logo/small.png');
`;

export default Header;
