import { atom, selector } from 'recoil';

export const stateAtom = atom<string[]>({
  key: 'stateAtom',
  default: [],
});
const searchParamsAtom = atom<string>({
  key: 'searchParamsAtom',
  default: window.location.search,
});
export const searchParamsState = selector<string>({
  key: 'searchParamsState',
  get: ({ get }) => {
    const params = get(searchParamsAtom);
    return params;
  },
  set: ({ set }, val) => {
    set(searchParamsAtom, val);
  },
});
