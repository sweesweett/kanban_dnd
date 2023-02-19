import { FocusEvent, FormEvent, useRef } from 'react';
import styled from 'styled-components';
import { graphqlFetcher } from '../../queryClient';
import { useMutation } from 'react-query';
import { RequestDocument } from 'graphql-request';
import { useSetRecoilState } from 'recoil';
import { listNameSelector } from '../../store';

const TaskTitleForm = ({ size, title, eventName }: { size: number; title: string; eventName: RequestDocument }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setTitles = useSetRecoilState(listNameSelector);
  const fetcher = useMutation((newState: string) => graphqlFetcher(eventName, { state: title, newState }), {
    onSuccess: (data) => {
      const { state } = data as { state: string };
      setTitles({ state: title, newState: state });
    },
    onError: (err: string) => {
      console.log(`Error:${err}`);
      if (inputRef.current) {
        inputRef.current.value = title;
      }
    },
  });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.titleVal as HTMLFormElement;
    const titleValue = title.value as string;
    fetcher.mutate(titleValue);
  };
  const blurHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value === title) {
      return;
    }
    fetcher.mutate(e.target.value);
  };
  return (
    <TitleForm onSubmit={submitHandler}>
      <TitleInput name="titleVal" onBlur={blurHandler} type="text" size={size} defaultValue={title} ref={inputRef} />
    </TitleForm>
  );
};

const TitleForm = styled.form`
  display: inline-block;
  width: 90%;
  box-sizing: border-box;
  -webkit-user-drag: none;
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
