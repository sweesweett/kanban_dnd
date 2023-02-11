import { listSelector } from '../store/index';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { ListContent, FamilyListValue } from '../types/lists';
import { useMutation } from 'react-query';
import { graphqlFetcher } from '../queryClient';
import useDynamicImport from './useDynamicImport';
import { v4 as uuidv4 } from 'uuid';

const useForm = (mode: string) => {
  const navigate = useNavigate();
  const query = useDynamicImport(mode);
  const setValue = useSetRecoilState(listSelector(mode));
  const fetcher = useMutation((data: ListContent) => graphqlFetcher(query, data), {
    onSuccess: (data) => {
      setValue(data as FamilyListValue);
      navigate('/');
    },
    onError: (err: string) => {
      console.log(`Error:${err}`);
    },
  });
  const getFormData = (form: HTMLFormElement, id = uuidv4()) => {
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    fetcher.mutate({ ...formObj, id } as ListContent);
  };
  return { getFormData };
};
export default useForm;
