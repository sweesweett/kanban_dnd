import React, { FocusEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { graphqlFetcher } from '../../queryClient';
import { useMutation } from 'react-query';
import { RequestDocument } from 'graphql-request';
import { useRecoilState } from 'recoil';
import { listNameSelector } from '../../store';
import { StateChange } from '../../types/lists';

const TaskTitleForm = ({ size, title, eventName }: { size: number; title: string; eventName: RequestDocument }) => {
  const [titles, setTitles] = useRecoilState(listNameSelector);
  const fetcher = useMutation((newState: string) => graphqlFetcher(eventName, { state: title, newState }), {
    onSuccess: (data) => {
      const { state } = data as { state: string };
      setTitles({ state: title, newState: state });
    },
    onError: () => {
      console.log('좃댓서콩지야');
    },
  });
  // TODO:graphql 에러(404) 고치기
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.titleVal as HTMLFormElement;
    const titleValue = title.value as string;
    fetcher.mutate(titleValue);

    // TODO:리액트 쿼리 useMutation 사용방법 더 찾아보고 리팩토링 하기
  };
  const blurHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value === title) {
      return;
    }
    fetcher.mutate(e.target.value);
    // TODO:리액트 쿼리 useMutation 사용방법 더 찾아보고 리팩토링 하기
  };
  return (
    <TitleForm onSubmit={submitHandler}>
      <TitleInput name="titleVal" onBlur={blurHandler} type="text" size={size} defaultValue={title} />
    </TitleForm>
  );
};

const TitleForm = styled.form`
  display: inline-block;
  width: 90%;
  box-sizing: border-box;
`;

const TitleInput = styled.input<{ size: number }>`
  margin: 12px;
  display: inline-block;
  font-size: ${({ size }) => size || 16}px;
  font-weight: 700;
  cursor: pointer;
  :focus {
    background-color: #fff;
    cursor: text;
  }
`;
export default TaskTitleForm;
