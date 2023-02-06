import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface AnyObj {
  [index: string]: string | null;
}

const useSearchParams = (arr: string[]) => {
  const [newObj, setNewObj] = useState<AnyObj>({});
  const [newArr] = useState([...arr]);
  const { search } = useLocation();
  useEffect(() => {
    const obj: AnyObj = {};
    if (search) {
      const params = new URLSearchParams(search);
      newArr.forEach((param: string) => {
        if (params.get(param)) obj[param] = params.get(param) as string;
        else obj[param] = null;
      });
      setNewObj(obj);
    } else {
      newArr.forEach((param: string) => {
        obj[param] = null;
      });
      setNewObj(obj);
    }
  }, [search, newArr]);

  return { ...newObj };
};
export default useSearchParams;
