export interface ListContent {
  [index: string]: number | string | null;
  id: string;
  order: number;
  title: string;
  content: string;
  endDate: string;
  manager: string | null;
}
export interface FormAddValue {
  [index: string]: number | string | null | undefined;
  id: string;
  order: number;
  title: string;
  content: string;
  endDate: string;
  manager: string | null;
  state?: string | undefined;
}

export interface FormEditValue {
  [index: string]: FormAddValue | string;
  data: FormAddValue;
  state: string;
}
export interface List {
  [index: string]: string | ListContent[];
  state: string;
  list: ListContent[];
}

interface Manager {
  id: number;
  name: string;
}
export interface Managers {
  managers: Manager[];
}

export interface StateChange {
  [index: string]: string;
  state: string;
  newState: string;
}
export interface FamilyListValue {
  [index: string]: string | ListContent;
  state: string;
  item: ListContent;
}
export interface DndContent {
  [index: string]: string | number;
  id: string;
  state: string;
  order: number;
}
export interface Dnd {
  [index: string]: DndContent;
  drag: DndContent;
  drop: DndContent;
}
export interface MutationDnd {
  [index: string]: Omit<DndContent, 'order'>;
}
