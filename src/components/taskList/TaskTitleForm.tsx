import { FormEvent } from 'react';
import styled from 'styled-components';

const TaskTitleForm = () => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={submitHandler}>
      <TitleInput type="text" defaultValue={'테스트중이야요'} />
    </form>
  );
};

const TitleInput = styled.input`
  margin: 20px;
  display: inline-block;
  font-size: 20px;
  font-weight: 700;

  :focus {
    background-color: #fff;
  }
`;
export default TaskTitleForm;
