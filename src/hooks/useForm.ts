import { useState, useEffect } from 'react';
import { Querykeys, getClient, graphqlFetcher } from '../queryClient';
import { useNavigate } from 'react-router-dom';
import { FormAddValue, FormEditValue } from '../types/lists';
import { useMutation } from 'react-query';
import useDynamicImport from './useDynamicImport';
import useThrottle from './useThrottle';

const useForm = (mode: string) => {
  const navigate = useNavigate();
  const query = useDynamicImport(mode);
  const [isThrottle, setIsThrottle] = useState(false);
  const throttle = useThrottle(isThrottle);
  const queryClient = getClient();
  useEffect(() => {
    if (!throttle) {
      setIsThrottle(false);
    }
  }, [throttle]);
  const fetcher = useMutation((data: FormEditValue | Partial<FormAddValue>) => graphqlFetcher(query, data), {
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [Querykeys.LISTS] });
      navigate('/');
    },
    onError: (err: string) => {
      console.log(`Error:${err}`);
    },
  });

  const isEditForm = (
    form: { [index: string]: string | null | number | undefined },
    id: string,
  ): form is FormAddValue => {
    return !!id;
  };
  const getFormData = (form: HTMLFormElement, state: string, id: string) => {
    const formData = new FormData(form).entries();
    const formObj = Object.fromEntries(formData) as Partial<FormAddValue>;
    if (!throttle) {
      setIsThrottle(true);
      if (isEditForm(formObj, id)) {
        fetcher.mutate({ data: { ...formObj, id }, state });
      } else {
        fetcher.mutate({ ...formObj });
      }
    }
  };
  return { getFormData };
};
export default useForm;
