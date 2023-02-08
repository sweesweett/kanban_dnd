import { useState, useEffect } from 'react';

const useDebounce = (value: number | string) => {
  const [debounceValue, setDebounceValue] = useState<number | string>(value);

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setDebounceValue(value);
    }, 200);

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [value]);

  return debounceValue;
};

export default useDebounce;
