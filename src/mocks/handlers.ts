import { ListContent, Managers } from '../types/lists';
/* eslint-disable import/no-extraneous-dependencies */
import { graphql } from 'msw';
import GET_LISTS, { GET_ITEM, PUT_LIST_TITLE, GET_MANAGER, POST_ITEM, PUT_ITEM } from '../graphql/lists';
import { lists, managers } from './db';

export const handlers = [
  graphql.query(GET_LISTS, (req, res, ctx) => {
    return res(
      ctx.delay(2000),
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

    lists[idx].list.push(data as ListContent);
    const managerIdx = managers.findIndex(({ name }) => name === data.manager);
    if (managerIdx === -1) {
      managers.push({ id: managers.length + 1, name: data.manager as string });
    }
    return res(
      ctx.data({
        item: data as ListContent,
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
        item: newData,
      }),
    );
  }),
];
