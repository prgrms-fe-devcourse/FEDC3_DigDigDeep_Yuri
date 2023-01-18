import useAxiosInterceptor from './hooks/useAxiosInterceptor';
import Router from './Router';
import GlobalStyle from './GlobalStyle';
import Modal from './components/Base/Modal';
import ToastList from './components/Base/ToastList';
import GlobalSpinner from './components/Base/GlobalSpinner';

function App() {
  useAxiosInterceptor();

  return (
    <>
      <Router />
      <GlobalStyle />
      <Modal />
      <ToastList />
      <GlobalSpinner />
    </>
  );
}

export default App;
