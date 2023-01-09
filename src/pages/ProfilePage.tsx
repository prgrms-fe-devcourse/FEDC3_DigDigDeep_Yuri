import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { userId } = useParams();
  return <div>ProfilePage, userId: {userId}</div>;
};

export default ProfilePage;
