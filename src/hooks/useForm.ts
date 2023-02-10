import { useNavigate } from 'react-router-dom';
import { ListContent } from '../types/lists';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { graphqlFetcher } from '../queryClient';
import { RequestDocument } from 'graphql-request';
import useDynamicImport from './useDynamicImport';

const useForm = (mode: string) => {
  // query: RequestDocument, queryOption: object
  const navigate = useNavigate();
  const query = useDynamicImport(mode);
  const fetcher = useMutation((data: ListContent) => graphqlFetcher(query, data), {
    onSuccess: (data) => {
      // TODO:데이터 변경
      navigate('/');
    },
    onError: (err: string) => {
      console.log(`Error:${err}`);
    },
  });
  const getFormData = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries()) as ListContent;
    console.log(formObj);
    fetcher.mutate(formObj);
  };
  return { getFormData };
};
export default useForm;
