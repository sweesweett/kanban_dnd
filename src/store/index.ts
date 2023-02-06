import { StateChange, List } from '../types/lists';
import { atom, selector } from 'recoil';

export const listAtom = atom<List[]>({
  key: 'listAtom',
  default: [],
});
export const listNameSelector = selector<string[] | StateChange>({
  key: 'listNameSelector',
  get: ({ get }) => {
    const getLists = get(listAtom);
    const listNames = getLists.map(({ state }) => state);
    return listNames;
  },
  set: ({ get, set }, value) => {
    const { state, newState } = value as StateChange;
    const getLists = get(listAtom);
    const listNames = get(listNameSelector) as string[];
    const idx = listNames.indexOf(state);
    set(
      listAtom,
      getLists.map((list) => {
        if (list.state === listNames[idx]) {
          const newList = { ...list };
          newList.state = newState;
          return newList;
        }
        return list;
      }),
    );
  },
});
