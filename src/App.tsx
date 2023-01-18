import useAxiosInterceptor from './hooks/useAxiosInterceptor';
import Router from './Router';
import GlobalStyle from './GlobalStyle';
import Modal from './components/Base/Modal';
import ToastList from './components/Base/ToastList';

function App() {
  useAxiosInterceptor();

  return (
    <>
      <Router />
      <GlobalStyle />
      <Modal />
      <ToastList />
    </>
  );
}

export default App;
