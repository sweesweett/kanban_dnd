import { QueryClient } from 'react-query';
import { request, RequestDocument } from 'graphql-request';

export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24,
            staleTime: 1000 * 60,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });
    return client;
  };
})();
const BASE_URL = '/';

export const graphqlFetcher = (query: RequestDocument, variables: object = {}) => request(BASE_URL, query, variables);
export const Querykeys = {
  LISTS: 'LISTS',
  ITEM: 'ITEM',
  MANAGER: 'MANAGER',
};
