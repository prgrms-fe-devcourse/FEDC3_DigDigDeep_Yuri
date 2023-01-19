import { atom } from 'recoil';

export type LoadingProps = boolean;

export const loadingState = atom<LoadingProps>({
  key: 'loadingState',
  default: false,
});
