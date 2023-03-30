import { FocusEvent, FormEvent, useRef } from 'react';
import styled from 'styled-components';
import { graphqlFetcher } from '../../queryClient';
import { useMutation } from 'react-query';
import { RequestDocument } from 'graphql-request';
import { useSetRecoilState } from 'recoil';
import { listNameSelector } from '../../store';
import { StateChange } from '../../types/lists';

const TaskTitleForm = ({ size, title, eventName }: { size: number; title: string; eventName: RequestDocument }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setTitles = useSetRecoilState(listNameSelector);
  const fetcher = useMutation((data: StateChange) => graphqlFetcher(eventName, data), {
    onSuccess: (data) => {
      const { state } = data as Pick<StateChange, 'state'>;
      if (state) {
        const newData: StateChange = { state: title, newState: state };
        setTitles(newData);
      }
    },
    onError: () => {
      if (inputRef.current) {
        inputRef.current.value = title;
      }
    },
  });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleEl = e.currentTarget.titleVal as HTMLInputElement;
    const titleValue = titleEl.value;
    const newData: StateChange = { state: title, newState: titleValue };
    fetcher.mutate(newData);
  };
  const blurHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value === title) {
      return;
    }
    fetcher.mutate({ state: title, newState: e.target.value });
  };
  return (
    <TitleForm onSubmit={submitHandler}>
      <TitleInput
        name="titleVal"
        onBlur={blurHandler}
        type="text"
        size={size}
        defaultValue={title}
        ref={inputRef}
        maxLength={12}
      />
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
  color: ${({ theme }) => theme.color};
  cursor: pointer;
  :focus {
    /* background-color: #fff; */
    cursor: text;
  }
`;
export default TaskTitleForm;
