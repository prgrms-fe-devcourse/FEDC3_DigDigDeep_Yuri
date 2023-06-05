import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState } from './recoil/atoms/user';
import ROUTES from './utils/routes';
import {
  HomePage,
  LoginPage,
  ProfilePage,
  MyLikesPage,
  SignUpPage,
  NotFoundPage,
  PostPage,
  NotificationsPage,
  SearchPage,
  PostEditPage,
  ProfileEditPage,
} from './pages';
import SearchbarLayout from './components/Layout/SearchbarLayout';

const Router = () => {
  const token = useRecoilValue(tokenState);

  return (
    <BrowserRouter>
      <Routes>
        {/* with searchbar */}
        <Route element={<SearchbarLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.SEARCH} element={<SearchPage />} />
          <Route path={ROUTES.PROFILE_ME_LIKES} element={<MyLikesPage />} />
          <Route path={ROUTES.NOTIFICATION} element={<NotificationsPage />} />
          <Route path={ROUTES.PROFILE_DETAIL} element={<ProfilePage />} />
          <Route path={ROUTES.POSTS_DETAIL} element={<PostPage />} />
          <Route
            path={ROUTES.PROFILE_ME_EDIT}
            element={
              !token ? (
                <Navigate replace to={ROUTES.PROFILE_ME} />
              ) : (
                <ProfileEditPage />
              )
            }
          />
        </Route>
        {/* without searchbar */}
        <Route
          path={ROUTES.LOGIN}
          element={
            token ? <Navigate replace to={ROUTES.HOME} /> : <LoginPage />
          }
        />
        <Route
          path={ROUTES.SIGNUP}
          element={
            token ? <Navigate replace to={ROUTES.HOME} /> : <SignUpPage />
          }
        />
        <Route path={ROUTES.POSTS_NEW} element={<PostEditPage />} />
        <Route path={ROUTES.POSTS_EDIT} element={<PostEditPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
