import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import useAxiosInterceptor from './hooks/useAxiosInterceptor';
import {
  HomePage,
  LoginPage,
  ProfilePage,
  SignUpPage,
  NotFoundPage,
  PostPage,
  NotificationsPage,
  SearchPage,
  PostEditPage,
} from './pages';
import { useRecoilValue } from 'recoil';
import { tokenState } from './recoil/atoms/user';

function App() {
  useAxiosInterceptor();
  const token = useRecoilValue(tokenState);

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/login"
          element={token ? <Navigate replace to="/" /> : <LoginPage />}
        ></Route>
        <Route
          path="/signup"
          element={token ? <Navigate replace to="/" /> : <SignUpPage />}
        ></Route>
        <Route path="/posts/:postId" element={<PostPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/profile/:userId" element={<ProfilePage />}></Route>
        <Route path="/notifications" element={<NotificationsPage />}></Route>
        <Route path="/edit/:postId" element={<PostEditPage />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
