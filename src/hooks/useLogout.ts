import { useSetRecoilState } from 'recoil';
import { tokenState, userState } from '../recoil/atoms/user';
import { logout as requestLogout } from '../utils/api/user';

const useLogout = () => {
  const setUser = useSetRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);

  const logout = async () => {
    await requestLogout();
    setUser({
      _id: '',
      likes: [],
      image: '',
      fullName: '',
      email: '',
    });
    setToken('');
  };

  return logout;
};

export default useLogout;
