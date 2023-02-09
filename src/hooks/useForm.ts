import { useMutation } from 'react-query';
import { useState } from 'react';
import { graphqlFetcher } from '../queryClient';
import { RequestDocument } from 'graphql-request';

const useForm = () => {
  // query: RequestDocument, queryOption: object
  // const fetcher = useMutation((data: object) => graphqlFetcher(query, data), queryOption);
  const serialize = (data: FormData) => {
    const formDataObject = Object.fromEntries(data.entries());
    return formDataObject;
  };
  const getFormData = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const formobj = serialize(formData);
  };
  return { getFormData };
};
export default useForm;
