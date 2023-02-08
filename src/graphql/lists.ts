import { gql } from 'graphql-tag';

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
  mutation PUT_LIST_TITLE($state: string, $newState: string) {
    state
  }
`;
export const GET_MANAGER = gql`
  query GET_MANAGER($searchString: string) {
    manangers
  }
`;
export const PUT_ITEM = gql`
  mutation PUT_ITEM($id: number, $state: string) {
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
export const POST_ITEM = gql`
  mutation POST_ITEM($id: number, $state: string) {
    item {
      id
      order
      title
      content
      endDate
      manager
    }
  }
`;
export default GET_LISTS;
