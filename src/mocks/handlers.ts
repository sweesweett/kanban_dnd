import {
  FormAddValue,
  StateChange,
  FamilyListValue,
  GetItemReq,
  Dnd,
  ListContent,
  FormEditValue,
  Managers,
  List,
} from '../types/lists';

/* eslint-disable import/no-extraneous-dependencies */
import { graphql } from 'msw';
import { lists, managers } from './db';
import { v4 as uuidv4 } from 'uuid';

// graphql.mutation<LoginMutation, LoginMutationVariables>(
export const handlers = [
  graphql.query('GET_LISTS', (req, res, ctx) => {
    return res(
      ctx.data({
        lists,
      }),
    );
  }),

  graphql.query<FamilyListValue, GetItemReq>('GET_ITEM', (req, res, ctx) => {
    const { id: idx, state: itemState } = req.variables;
    const stateIdx = lists.findIndex(({ state }) => state === itemState);
    if (stateIdx > -1) {
      const id = lists[stateIdx].list.findIndex(({ id }) => id === idx);
      if (id === -1) {
        return res(ctx.status(404, 'Not found'));
      }
      return res(
        ctx.delay(2000),
        ctx.data({
          state: itemState,
          item: lists[stateIdx].list[id],
        }),
      );
    }
    return res(ctx.status(404, 'Not found'));
  }),
  graphql.query<Managers, { searchString: string }>('GET_MANAGER', (req, res, ctx) => {
    const searchVal = req.variables.searchString;
    if (!searchVal) {
      return res(
        ctx.data({
          managers: [],
        }),
      );
    }
    const newData = managers.filter(({ name }) => name.includes(searchVal));
    return res(
      ctx.data({
        managers: newData,
      }),
    );
  }),
  graphql.mutation<{ state: string }, StateChange>('PUT_LIST_TITLE', (req, res, ctx) => {
    const { state: prevState, newState } = req.variables;
    const idx = lists.findIndex(({ state }) => state === prevState);
    if (idx > -1) {
      lists[idx].state = newState;
      return res(
        ctx.data({
          state: newState,
        }),
      );
    }
    return res(ctx.status(404));
  }),

  graphql.mutation<FamilyListValue, FormAddValue>('POST_ITEM', (req, res, ctx) => {
    // TODO:코드 수정

    const id = uuidv4();
    const data = req.variables;
    const idx = lists.findIndex(({ state: title }) => title === data.state);
    const { length } = lists[idx].list;
    const newData = { ...(delete data.state, data), order: length, id } as ListContent;
    lists[idx].list.push(newData);
    const managerIdx = managers.findIndex(({ name }) => name === data.manager);
    if (managerIdx === -1 && data.manager !== null) {
      managers.push({ id: managers.length + 1, name: data.manager });
    }
    return res(
      ctx.data({
        state: lists[idx].state,
        item: newData,
      }),
    );
  }),
  graphql.mutation<FamilyListValue, FormEditValue>('PUT_ITEM', (req, res, ctx) => {
    const { data, state } = req.variables;

    const managerIdx = managers.findIndex(({ name }) => name === data.manager);
    const idx = lists.findIndex(({ state: title }) => title === state);
    const itemIdx: number = lists[idx].list.findIndex(({ id }) => id === data.id);
    if (managerIdx === -1 && data.manager !== null) {
      managers.push({ id: managers.length + 1, name: data.manager });
    }
    // TODO:타입 에러, 수정 필수: manager null일때 고려해야함
    if (data.state !== state) {
      const newIdx = lists.findIndex(({ state: title }) => title === data.state);
      const newData = { ...(delete data.state, data) } as ListContent;
      lists[idx].list.splice(itemIdx, 1);
      lists[newIdx].list.push(newData);
      return res(
        ctx.data({
          state,
          item: newData,
        }),
      );
    }
    const newData = { ...(delete data.state, data) } as ListContent;
    lists[idx].list[itemIdx] = newData;
    return res(
      ctx.data({
        state,
        item: newData,
      }),
    );
  }),
  graphql.mutation('DELETE_ITEM', (req, res, ctx) => {
    const data = req.variables;
    const idx = lists.findIndex(({ state: title }) => title === data.state);
    if (idx > -1) {
      const itemIdx = lists[idx].list.findIndex(({ id: idx }) => data.id === idx);
      if (itemIdx > -1) {
        lists[idx].list.splice(itemIdx, 1);
        return res(
          ctx.data({
            state: lists[idx].state,
            item: { id: data.id as string },
          }),
        );
      }
      return res(ctx.status(404));
    }
    return res(ctx.status(404));
  }),
  graphql.mutation<{ lists: List[] }, Dnd>('PUT_DND', (req, res, ctx) => {
    const { drag, drop } = req.variables;
    const dndArr = [-1, -1];
    lists.forEach(({ state }, idx) => {
      if (state === drag.state) {
        dndArr[0] = idx;
      }
      if (state === drop.state) {
        dndArr[1] = idx;
      }
    });
    const [dragStateIdx, dropStateIdx] = dndArr;
    if (!(dragStateIdx > -1 && dropStateIdx > -1)) return res(ctx.status(404));
    const dragIdIdx = lists[dragStateIdx].list.findIndex(({ id: idx }) => drag.id === idx);
    const dropIdIdx = lists[dropStateIdx].list.findIndex(({ id: idx }) => drop.id === idx);

    const dragItem = lists[dragStateIdx].list.splice(dragIdIdx, 1);
    if (dropIdIdx === -1) {
      lists[dropStateIdx].list.push(dragItem[0]);
    } else {
      lists[dropStateIdx].list.splice(dropIdIdx, 0, dragItem[0]);
    }
    lists[dragStateIdx].list.forEach((el, idx) => {
      el.order = idx;
    });
    lists[dropStateIdx].list.forEach((el, idx) => {
      el.order = idx;
    });

    return res(
      ctx.data({
        lists,
      }),
    );
  }),
];
