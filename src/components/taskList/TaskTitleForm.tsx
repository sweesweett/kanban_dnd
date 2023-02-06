import React, { FocusEvent, FormEvent } from 'react';

import styled from 'styled-components';
import { graphqlFetcher } from '../../queryClient';
import { useMutation } from 'react-query';
import { RequestDocument } from 'graphql-request';

const TaskTitleForm = ({ size, title, eventName }: { size: number; title: string; eventName: RequestDocument }) => {
  const fetcher = useMutation((newState: string) => graphqlFetcher(eventName, { state: title, newState }));

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.titleVal as HTMLFormElement;
    fetcher.mutate(title.value as string);
    title.blur();
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
