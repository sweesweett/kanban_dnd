import { gql } from 'graphql-tag';
import { List } from '../types/lists';

const GET_LISTS = gql`
  query GET_LISTS {
    state
    list {
      id
      order
      title
      manager
    }
  }
`;
export const GET_ITEM = gql`
  query GET_ITEM($id: string, $state: string) {
    item(id: $id) {
      id
      order
      title
      content
      endDate
      manager
    }
  }
`;
export const PUT_LIST_TITLE = gql`
  query PUT_LIST_TITLE($state: string) {
    state
  }
`;
export const GET_MANAGER = gql`
  query GET_MANAGER($searchString: string) {
    manangers
  }
`;
export default GET_LISTS;
