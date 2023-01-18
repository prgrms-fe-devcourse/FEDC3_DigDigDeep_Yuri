import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atoms/user';
import { getUser } from '../utils/api/user';
import useLogout from './useLogout';

const useGetMyInfo = () => {
  const [user, setUser] = useRecoilState(userState);
  const logout = useLogout();

  const getMyInfo = async () => {
    try {
      const responseUser = await getUser(user._id);
      setUser({ ...user, ...responseUser });
    } catch (error) {
      console.error(error);
      logout();
    }
  };

  return getMyInfo;
};

export default useGetMyInfo;
