import { StateChange, List, Dnd, DndContent } from '../types/lists';
import { atom, selector, selectorFamily } from 'recoil';

export const listAtom = atom<string[]>({
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
    return get(listAtom);
  },
  set: ({ get, set }, value) => {
    const { state, newState } = value as StateChange;
    const newData = get(listAtom).map((el) => {
      if (el === state) {
        return newState;
      }
      return el;
    });
    set(listAtom, newData);
  },
});

export const dndAtom = atom<Dnd>({
  key: 'dndAtom',
  default: {
    drag: { id: '', state: '', order: -1 },
    drop: { id: '', state: '', order: -1 },
  },
});

export const dndSelector = selectorFamily<Dnd[string] | Dnd, string>({
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
