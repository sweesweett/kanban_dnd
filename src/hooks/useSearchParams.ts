import { useEffect, useState } from 'react';

interface AnyObj {
  [index: string]: string | null;
}

const useSearchParams = (arr: string[]) => {
  const [newObj, setNewObj] = useState({});

  useEffect(() => {
    const obj: AnyObj = {};
    const params = new URL(location).searchParams;
    const getParamsArr = arr.forEach((param: string) => {
      if (params.get(param)) obj[param] = params.get(param) as string;
      else obj[param] = null;
    });
    setNewObj(obj);
    // console.log('sibal', { ...obj });
  }, [location.search]);

  return { ...newObj };
};
export default useSearchParams;
