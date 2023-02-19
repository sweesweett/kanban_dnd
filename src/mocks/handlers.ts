import {
  PUT_DND,
  DELETE_ITEM,
  GET_LISTS,
  GET_ITEM,
  PUT_LIST_TITLE,
  GET_MANAGER,
  POST_ITEM,
  PUT_ITEM,
} from '../graphql/lists';

/* eslint-disable import/no-extraneous-dependencies */
import { Dnd, ListContent } from '../types/lists';
import { graphql } from 'msw';

import { lists, managers } from './db';

export const handlers = [
  graphql.query(GET_LISTS, (req, res, ctx) => {
    return res(
      ctx.data({
        lists,
      }),
    );
  }),

  graphql.query(GET_ITEM, (req, res, ctx) => {
    const { id: idx, state: itemState } = req.variables;
    const stateIdx = lists.findIndex(({ state }) => state === itemState);
    if (stateIdx > -1) {
      const id = lists[stateIdx].list.findIndex(({ id }) => id === idx);
      if (id === -1) {
        return res(ctx.status(404, 'Not found'));
      }
      return res(
        ctx.data({
          state: itemState as string,
          item: lists[stateIdx].list[id],
        }),
      );
    }
    return res(ctx.status(404, 'Not found'));
  }),
  graphql.query(GET_MANAGER, (req, res, ctx) => {
    const searchVal = req.variables.searchString as string;
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
  graphql.mutation(PUT_LIST_TITLE, (req, res, ctx) => {
    const { state: prevState, newState } = req.variables;
    const idx = lists.findIndex(({ state }) => state === prevState);
    if (idx > -1) {
      lists[idx].state = newState as string;
      return res(
        ctx.data({
          state: newState as string,
        }),
      );
    }
    return res(ctx.status(404));
  }),
  graphql.mutation(POST_ITEM, (req, res, ctx) => {
    const data = req.variables;
    const idx = lists.findIndex(({ state: title }) => title === data.state);
    const { length } = lists[idx].list;
    const newData = { ...(delete data.state, data), order: length };
    lists[idx].list.push(newData as ListContent);
    const managerIdx = managers.findIndex(({ name }) => name === data.manager);
    if (managerIdx === -1) {
      managers.push({ id: managers.length + 1, name: data.manager as string });
    }
    return res(
      ctx.data({
        state: lists[idx].state,
        item: newData as ListContent,
      }),
    );
    // TODO: uuid로 변경 후 하자
  }),
  graphql.mutation(PUT_ITEM, (req, res, ctx) => {
    const data = req.variables;
    const idx = lists.findIndex(({ state: title }) => title === data.state);
    const newData = { ...(delete data.state, data) };
    const putDataIdx: number = lists[idx].list.findIndex(({ id }) => id === data.id);
    lists[idx].list[putDataIdx] = newData as ListContent;
    const managerIdx = managers.findIndex(({ name }) => name === data.manager);
    if (managerIdx === -1) {
      managers.push({ id: managers.length + 1, name: data.manager as string });
    }
    return res(
      ctx.data({
        state: lists[idx].state,
        item: newData,
      }),
    );
  }),
  graphql.mutation(DELETE_ITEM, (req, res, ctx) => {
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
  graphql.mutation(PUT_DND, (req, res, ctx) => {
    const data = req.variables;
    const { drag, drop } = data as Dnd;
    const dragStateIdx = lists.findIndex(({ state: title }) => title === drag.state);
    const dropStateIdx = lists.findIndex(({ state: title }) => title === drop.state);

    if (!(dragStateIdx > -1 && dropStateIdx > -1)) return res(ctx.status(404));
    const dragIdIdx = lists[dragStateIdx].list.findIndex(({ id: idx }) => drag.id === idx);
    console.log(dragIdIdx);
    const dropIdIdx = lists[dropStateIdx].list.findIndex(({ id: idx }) => drop.id === idx);
    console.log(dragIdIdx, dropIdIdx);
    const dragItem = lists[dragStateIdx].list.splice(dragIdIdx, 1);
    if (dropIdIdx === -1) {
      lists[dropStateIdx].list.push(dragItem[0]);
    } else {
      lists[dropStateIdx].list.splice(dropIdIdx, 0, dragItem[0]);
    }

    return res(
      ctx.data({
        lists,
      }),
    );

    // const dragStateIdx = lists.findIndex(({ state: title }) => title === drag.state);
  }),
];
