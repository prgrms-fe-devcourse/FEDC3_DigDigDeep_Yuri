import NotificationList from '../components/Notification/NotificationList';
import DetailHeader from '../components/Header/DetailHeader';
import styled from 'styled-components';

const NotificationsPage = () => {
  return (
    <Container>
      <DetailHeader name="알림" isButton={false} />
      <NotificationList />
    </Container>
  );
};

export default NotificationsPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
