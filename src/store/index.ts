import { StateChange, List, Dnd, DndContent } from '../types/lists';
import { atom, selector, selectorFamily } from 'recoil';

export const listAtom = atom<List[]>({
  key: 'listAtom',
  default: [],
});
export const SearchAtom = atom<string>({
  key: 'searchAtom',
  default: '',
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

export const dndAtom = atom<Dnd>({
  key: 'dndAtom',
  default: {
    drag: { id: '', state: '' },
    drop: { id: '', state: '' },
  },
});

export const dndSelector = selectorFamily<DndContent | Dnd, string>({
  key: 'dndSelector',
  get:
    (param: string) =>
    ({ get }) => {
      const data = get(dndAtom);
      return data[param];
    },
  set:
    (param: string) =>
    ({ get, set }, value) => {
      const data = get(dndAtom);
      const newData = { ...data, [param]: value } as Dnd;
      set(dndAtom, newData);
    },
});
