import { atom } from 'recoil';

export type SearchProps = {
  value: string;
  options: {
    label: string;
    value: 'posts' | 'users';
  };
};

export const searchState = atom<SearchProps>({
  key: 'searchState',
  default: {
    value: '',
    options: {
      label: '그라운드',
      value: 'posts',
    },
  },
});
