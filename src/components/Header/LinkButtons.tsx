import { Link, useLocation, useNavigate } from 'react-router-dom';
import useCheckNotifications from '../../hooks/useNotification';
import { queryLowImage } from '../../utils/image';
import ROUTES from '../../utils/routes';
import LinkButton from '../Button/LinkButton';
import styled, { css } from 'styled-components';
import COLORS from '../../utils/colors';
import useLogout from '../../hooks/useLogout';
import useModal from '../../hooks/useModal';
import useToast from '../../hooks/useToast';
import { CONFIRM_MESSAGES, ERROR_MESSAGES } from '../../utils/messages';
import { tokenState, userState } from '../../recoil/atoms/user';
import { useRecoilValue } from 'recoil';

const defaultProfile = require('../../assets/images/icon/default-profile.png');

const LinkButtons = () => {
  const token = useRecoilValue(tokenState);
  const user = useRecoilValue(userState);
  const { isSeen } = useCheckNotifications();
  const { pathname } = useLocation();
  const isProfilePage = pathname.includes('/profile/me');

  const logout = useLogout();
  const { showModal } = useModal();
  const { showToast } = useToast();
  const navigate = useNavigate();

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

  if (!token) {
    return <LogInButton to="/login">LOG IN</LogInButton>;
  }

  return (
    <>
      {isProfilePage ? (
        <LogOutButton onClick={handleLogout}>LOGOUT</LogOutButton>
      ) : (
        <>
          <LinkButton to={ROUTES.POSTS_NEW} name="new" size={24} />
          <LinkButton
            to={ROUTES.NOTIFICATION}
            name={isSeen ? 'notification-off' : 'notification-on'}
            size={24}
          />
          <LinkButton
            to={ROUTES.PROFILE_ME}
            src={queryLowImage(user.image || defaultProfile, 'profile')}
            alt="profile-image"
            isProfile={true}
            name="profile"
            size={24}
          />
        </>
      )}
    </>
  );
};

const LinkContainer = css`
  width: 100%;
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: -0.01em;
  color: ${COLORS.white};
  padding: 1.3rem 2rem;
  border-radius: 23.5px;
  border: none;
  min-width: max-content;
  cursor: pointer;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    padding: 1.2rem 1.8rem;
  }
`;

const LogOutButton = styled.button`
  color: ${COLORS.white};
  background-color: ${COLORS.lightGray};
  ${LinkContainer};
  font-size: 1rem;
`;

const LogInButton = styled(Link)`
  background-color: ${COLORS.green};
  ${LinkContainer}
`;

export default LinkButtons;
