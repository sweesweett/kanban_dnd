import { graphql } from 'msw';
import GET_LISTS, { GET_ITEM, PUT_LIST_TITLE } from '../graphql/lists';
import { lists } from './db';
export const handlers = [
  graphql.query(GET_LISTS, (req, res, ctx) => {
    return res(
      ctx.data({
        lists: [...lists],
      }),
    );
  }),
  graphql.query(PUT_LIST_TITLE, (req, res, ctx) => {
    console.log(req.variables.state, req.variables.newState);
    const newState = req.variables.newState;
    const idx = lists.findIndex(({ state }) => state === req.variables.state);
    if (idx > -1) {
      lists[idx].state = newState;
      return res(
        ctx.data({
          state: newState,
        }),
      );
    } else {
      return res(ctx.status(404));
    }
  }),

  // graphql.query(GET_LIST, (req, res, ctx) => {
  //   // console.log(req.variables.id);
  //   let idx = .findIndex((el) => el.id === req.variables.id);
  //   return res(ctx.data(mock_products[idx]));
  // }),
];
