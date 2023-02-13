import { RequestDocument } from 'graphql-request';
import { useState, useEffect } from 'react';

const useDynamicImport = (mode: string) => {
  const [query, setquery] = useState<RequestDocument>('');
  const dynamicImport = async (mode: string) => {
    if (mode === 'edit') {
      await import('../graphql/lists').then((q) => setquery(q.PUT_ITEM));
    } else {
      await import('../graphql/lists').then((q) => setquery(q.POST_ITEM));
    }
  };

  useEffect(() => {
    if (mode) {
      void dynamicImport(mode);
      // TODO: eslint에 맞게 고치기^^>..
    }
  }, [mode]);

  return query;
};

export default useDynamicImport;
