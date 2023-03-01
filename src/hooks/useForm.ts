import { Querykeys, getClient, graphqlFetcher } from '../queryClient';
import { useNavigate } from 'react-router-dom';
import { FormAddValue, FormEditValue } from '../types/lists';
import { useMutation } from 'react-query';
import useDynamicImport from './useDynamicImport';

const useForm = (mode: string) => {
  const navigate = useNavigate();
  const query = useDynamicImport(mode);
  const queryClient = getClient();
  const fetcher = useMutation((data: FormEditValue | Partial<FormAddValue>) => graphqlFetcher(query, data), {
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [Querykeys.LISTS] });
      navigate('/');
    },
    onError: (err: string) => {
      console.log(`Error:${err}`);
    },
  });
  const getFormData = (form: HTMLFormElement, state: string, id: string) => {
    // TODO: 서버쪽에서 id를 부여하는 방식이 더 맞는게 아닐까? 고민해보기
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    if (mode === 'add') {
      fetcher.mutate({ ...formObj } as Partial<FormAddValue>);
    } else if (mode === 'edit') {
      fetcher.mutate({ data: { ...formObj, id }, state } as FormEditValue);
    }
  };
  return { getFormData };
};
export default useForm;
