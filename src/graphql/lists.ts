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
  query GET_LIST($id: string, $state: string) {
    state
    list {
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
export default GET_LISTS;
