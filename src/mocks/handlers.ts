import { graphql } from 'msw';
import GET_LISTS, { GET_ITEM, PUT_LIST_TITLE, GET_MANAGER } from '../graphql/lists';
import { lists, managers } from './db';

export const handlers = [
  graphql.query(GET_LISTS, (req, res, ctx) => {
    return res(
      ctx.data({
        lists: [...lists],
      }),
    );
  }),
  graphql.query(PUT_LIST_TITLE, (req, res, ctx) => {
    const { newState } = req.variables;
    const idx = lists.findIndex(({ state }) => state === req.variables.state);
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

  graphql.query(GET_ITEM, (req, res, ctx) => {
    const { id: idx, state: itemState } = req.variables;
    const stateIdx = lists.findIndex(({ state }) => state === itemState);
    if (stateIdx > -1) {
      const id = lists[stateIdx].list.findIndex(({ id }) => id === Number(idx));
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
];
