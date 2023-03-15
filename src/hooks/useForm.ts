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
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    if (mode === 'add' && 'data' in formObj) {
      fetcher.mutate({ ...formObj } as Partial<FormAddValue>);
      // TODO: as 지양하기 위해 코드 수정 필 근데 여기서는 필요하지 않을까?
    } else if (mode === 'edit') {
      fetcher.mutate({ data: { ...formObj, id }, state } as FormEditValue);
    }
  };
  return { getFormData };
};
export default useForm;
