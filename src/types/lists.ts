export interface ListContent {
  id: number;
  order: number;
  title: string;
  content: string;
  endDate: string;
  manager: string | null;
}

export interface List {
  state: string;
  list: ListContent[];
}
