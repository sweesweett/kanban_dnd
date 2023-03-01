import { DndContent } from '../types/lists';
import { useEffect, useState, useCallback } from 'react';
import { dndSelector } from '../store/index';
import { useSetRecoilState } from 'recoil';

const useDebounceDnd = () => {
  const [debounceValue, setDebounceValue] = useState<DndContent>({
    id: '',
    state: '',
    order: -1,
  });
  const setDndDrop = useSetRecoilState(dndSelector('drop'));

  const deBouncingSetDrop = useCallback(({ id, state, order }: DndContent) => {
    setDebounceValue({ id, state, order });
  }, []);

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      console.log('test');
      setDndDrop(debounceValue);
    }, 3000);

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [debounceValue, setDndDrop]);

  return { deBouncingSetDrop };
};

export default useDebounceDnd;
