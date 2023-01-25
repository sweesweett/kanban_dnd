import { List } from '../types/lists';

export const lists: List[] = [
  {
    state: 'Todo',
    list: [
      {
        id: 1,
        order: 0,
        title: 'asd',
        content: 'asd',
        endDate: '2023-01-04',
        manager: '은우',
      },
      {
        id: 2,
        order: 1,
        title: 'zxc',
        content: 'zxc',
        endDate: '2023-01-04',
        manager: null,
      },
      {
        id: 3,
        order: 2,
        title: 'qwe',
        content: 'qwe',
        endDate: '2023-01-04',
        manager: '윤진',
      },
      {
        id: 4,
        order: 3,
        title: 'fgh',
        content: 'fgh',
        endDate: '2023-01-04',
        manager: '빵상',
      },
      {
        id: 5,
        order: 0,
        title: 'rty',
        content: 'rty',
        endDate: '2023-01-04',
        manager: null,
      },
    ],
  },
  {
    state: 'Doing',
    list: [
      {
        id: 6,
        order: 0,
        title: 'asd',
        content: 'asd',
        endDate: '2023-01-04',
        manager: '아이스티',
      },
      {
        id: 7,
        order: 1,
        title: 'zxc',
        content: 'zxc',
        endDate: '2023-01-04',
        manager: '제로',
      },
      {
        id: 8,
        order: 2,
        title: 'qwe',
        content: 'qwe',
        endDate: '2023-01-04',
        manager: null,
      },
      {
        id: 9,
        order: 3,
        title: 'fgh',
        content: 'fgh',
        endDate: '2023-01-04',
        manager: '뚜껑',
      },
      {
        id: 10,
        order: 4,
        title: 'rty',
        content: 'rty',
        endDate: '2023-01-04',
        manager: null,
      },
    ],
  },
  {
    state: 'Done',
    list: [
      {
        id: 11,
        order: 0,
        title: 'asd',
        content: 'asd',
        endDate: '2023-01-04',
        manager: '아이스티',
      },
      {
        id: 12,
        order: 1,
        title: 'zxc',
        content: 'zxc',
        endDate: '2023-01-04',
        manager: '제로',
      },
      {
        id: 13,
        order: 2,
        title: 'qwe',
        content: 'qwe',
        endDate: '2023-01-04',
        manager: '바나나',
      },
      {
        id: 14,
        order: 3,
        title: 'fgh',
        content: 'fgh',
        endDate: '2023-01-04',
        manager: '뚜껑',
      },
      {
        id: 15,
        order: 4,
        title: 'rty',
        content: 'rty',
        endDate: '2023-01-04',
        manager: null,
      },
    ],
  },
];
export const MANAGER = [
  {
    id: 1,
    name: '아이스티',
  },
  {
    id: 2,
    name: '복숭아',
  },
  {
    id: 3,
    name: '뚜껑',
  },
  {
    id: 4,
    name: '바나나',
  },
  {
    id: 5,
    name: '제로',
  },
  {
    id: 6,
    name: '이윤진',
  },
];