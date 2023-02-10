import { RequestDocument } from 'graphql-request';
import React, { useState, useEffect } from 'react';

const useDynamicImport = (mode: string) => {
  const [query, setquery] = useState<RequestDocument>('');
  const dynamicImport = async (mode: string) => {
    if (mode === 'edit') {
      await import('../graphql/lists').then((f) => setquery(f.PUT_ITEM));
    } else {
      await import('../graphql/lists').then((f) => setquery(f.POST_ITEM));
    }
    console.log(mode);
  };

  useEffect(() => {
    if (mode) {
      dynamicImport(mode);
      // TODO: eslint에 맞게 고치기^^>..
    }
  }, [mode]);

  return query;
};

export default useDynamicImport;
