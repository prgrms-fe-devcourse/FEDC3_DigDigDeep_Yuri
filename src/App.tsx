import useAxiosInterceptor from './hooks/useAxiosInterceptor';
import GlobalStyle from './components/GlobalStyle';
import Modal from './components/Base/Modal';
import ToastList from './components/Base/ToastList';
import Router from './Router';

function App() {
  useAxiosInterceptor();

  return (
    <>
      <GlobalStyle />
      <Modal />
      <ToastList />
      <Router />
    </>
  );
}

export default App;
