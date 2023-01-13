import { atom } from 'recoil';
import type { AtomEffect } from 'recoil';
import { User } from '../../types/user';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const item = localStorage.getItem(key);
    if (item) {
      setSelf(JSON.parse(item));
    }

    onSet((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  };

export const userState = atom<User>({
  key: 'userState',
  default: {
    _id: '',
    likes: [],
    image: '',
    fullName: '',
    email: '',
  },
  effects: [localStorageEffect('user')],
});

export const tokenState = atom<string>({
  key: 'tokenState',
  default: '',
  effects: [localStorageEffect('token')],
});
