import { StateChange, List, ListContent, FamilyListValue } from '../types/lists';
import { atom, DefaultValue, selector, selectorFamily } from 'recoil';

export const listAtom = atom<List[]>({
  key: 'listAtom',
  default: [],
});
export const SearchAtom = atom<string>({
  key: 'searchAtom',
  default: '',
});
export const listSelector = selectorFamily<FamilyListValue | List[], string>({
  key: 'listSelector',
  get:
    () =>
    ({ get }) => {
      return get(listAtom);
    },

  // optional set
  set:
    (multiplier) =>
    ({ set, get }, newValue) => {
      const lists = [...get(listAtom)];
      const { state, item: list } = newValue as FamilyListValue;
      const idx = lists.findIndex(({ state: origin }) => state === origin);
      if (multiplier === 'add') {
        const newList = lists.map((el) => {
          if (el.state === state) {
            return { state, list: [...el.list, list] };
          }
          return el;
        });
        set(listAtom, newList);
      } else {
        const newList = lists[idx].list.map((el) => {
          if (el.id === list.id) {
            return list;
          }
          return el;
        });
        const newLists = lists.map((el) => {
          if (el.state === state) {
            return { state, list: newList };
          }
          return el;
        });
        set(listAtom, newLists);
      }
    },
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
