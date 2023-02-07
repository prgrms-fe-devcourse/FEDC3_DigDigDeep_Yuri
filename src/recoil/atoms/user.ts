import { atom } from 'recoil';
import { defaultUserValue } from '../../utils/constants';
import type { AtomEffect } from 'recoil';
import type { RecoilUser } from '../../types/recoil/user';

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

export const userState = atom<RecoilUser>({
  key: 'userState',
  default: defaultUserValue,
  effects: [localStorageEffect('user')],
});

export const tokenState = atom<string>({
  key: 'tokenState',
  default: '',
  effects: [localStorageEffect('token')],
});
