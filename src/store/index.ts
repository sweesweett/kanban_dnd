import { atom } from 'recoil';

export const stateAtom = atom<string[]>({
  key: 'stateAtom',
  default: [],
});
