import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const SearchbarLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default SearchbarLayout;
