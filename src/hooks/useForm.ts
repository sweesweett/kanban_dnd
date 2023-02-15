import { Querykeys, getClient, graphqlFetcher } from '../queryClient';
import { useNavigate } from 'react-router-dom';
import { ListContent } from '../types/lists';
import { useMutation } from 'react-query';
import useDynamicImport from './useDynamicImport';
import { v4 as uuidv4 } from 'uuid';

const useForm = (mode: string) => {
  const navigate = useNavigate();
  const query = useDynamicImport(mode);
  const queryClient = getClient();
  const fetcher = useMutation((data: ListContent) => graphqlFetcher(query, data), {
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: [Querykeys.LISTS] });
      navigate('/');
    },
    onError: (err: string) => {
      console.log(`Error:${err}`);
    },
  });
  const getFormData = (form: HTMLFormElement, id = uuidv4()) => {
    // TODO: 서버쪽에서 id를 부여하는 방식이 더 맞는게 아닐까? 고민해보기
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    fetcher.mutate({ ...formObj, id } as ListContent);
  };
  return { getFormData };
};
export default useForm;
