import { RequestDocument } from 'graphql-request';
import { useState, useEffect } from 'react';

const useDynamicImport = (mode: string) => {
  const [query, setQuery] = useState<RequestDocument>('');
  const dynamicImport = async (mode: string) => {
    await import('../graphql/lists').then((q) => {
      if (mode === 'edit') {
        return setQuery(q.PUT_ITEM);
      }

      return setQuery(q.POST_ITEM);
    });
  };

  useEffect(() => {
    if (mode) {
      void dynamicImport(mode);
    }
  }, [mode]);

  return query;
};

export default useDynamicImport;
