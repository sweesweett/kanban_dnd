import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface AnyObj {
  [index: string]: string;
}

const useSearchParams = (arr: string[]) => {
  const [newObj, setNewObj] = useState<AnyObj>({});
  const newArr = useRef([...arr]);
  const { search } = useLocation();
  useEffect(() => {
    const obj: AnyObj = {};
    if (search) {
      const params = new URLSearchParams(search);
      newArr.current.forEach((param: string) => {
        if (params.get(param)) {
          obj[param] = params.get(param) ?? '';
        } else {
          obj[param] = '';
        }
      });
      setNewObj(obj);
    } else {
      newArr.current.forEach((param: string) => {
        obj[param] = '';
      });
      setNewObj(obj);
    }
  }, [search, newArr]);

  return { ...newObj };
};
export default useSearchParams;
