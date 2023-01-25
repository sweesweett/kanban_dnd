import { graphql } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import GET_LISTS, { GET_ITEM } from '../graphql/lists';
import { lists } from './db';
export const handlers = [
  graphql.query(GET_LISTS, (req, res, ctx) => {
    return res(
      ctx.data({
        lists: [...lists],
      }),
    );
  }),
  // graphql.query(GET_LIST, (req, res, ctx) => {
  //   // console.log(req.variables.id);
  //   let idx = .findIndex((el) => el.id === req.variables.id);
  //   return res(ctx.data(mock_products[idx]));
  // }),
];
