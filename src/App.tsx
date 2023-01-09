import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useAxiosInterceptor from './hooks/useAxiosInterceptor';
import { HomePage, LoginPage, ProfilePage } from './pages';
import SignUpPage from './pages/SignUpPage';
import PostPage from './pages/PostPage';
import NotificationsPage from './pages/NotificationsPage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';

function App() {
  useAxiosInterceptor();

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/posts/:postId" element={<PostPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/profile/:userId" element={<ProfilePage />}></Route>
        <Route path="/notifications" element={<NotificationsPage />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
