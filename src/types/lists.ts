export interface ListContent {
  [index: string]: number | string | null;
  id: string;
  order: number;
  title: string;
  content: string;
  endDate: string;
  manager: string | null;
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
