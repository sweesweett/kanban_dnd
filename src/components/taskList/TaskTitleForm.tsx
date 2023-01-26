import { FormEvent } from 'react';
import styled from 'styled-components';

const TaskTitleForm = ({ size, title, event }: { size: number; title: string; event: any }) => {
  // event: Promise<void>;
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.titleVal.value;
    event(title);
    e.currentTarget.titleVal.blur();
  };
  return (
    <TitleForm onSubmit={submitHandler}>
      <TitleInput name="titleVal" type="text" size={size} defaultValue={title} />
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
  font-size: ${({ size }) => (size ? size : 16)}px;
  font-weight: 700;
  cursor: pointer;
  :focus {
    background-color: #fff;
    cursor: text;
  }
`;
export default TaskTitleForm;
