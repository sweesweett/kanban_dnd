import { StateChange, Dnd } from '../types/lists';
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
    const getListName = get(listAtom);
    if (Array.isArray(get(listAtom))) {
      return getListName;
    }

    return [];
  },
  set: ({ get, set }, value) => {
    if ('state' in value) {
      const { state, newState } = value;
      const newData = get(listAtom).map((el) => {
        if (el === state) {
          return newState;
        }
        return el;
      });
      set(listAtom, newData);
    }
  },
});

export const dndAtom = atom<Dnd>({
  key: 'dndAtom',
  default: {
    drag: { id: '', state: '', order: -1 },
    drop: { id: '', state: '', order: -1 },
  },
});

export const dndSelector = selectorFamily<Dnd[string] | Dnd, 'drag' | 'drop'>({
  key: 'dndSelector',
  get:
    (param) =>
    ({ get }) => {
      const data = get(dndAtom);
      return data[param];
    },
  set:
    (param) =>
    ({ get, set }, value) => {
      const data = get(dndAtom);
      if (!('drag' in value) && 'state' in value) {
        const newData = { ...data, [param]: value };
        set(dndAtom, newData);
      }
    },
});
