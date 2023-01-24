import { FormEvent } from 'react';
import styled from 'styled-components';

const TaskTitleForm = ({ size }: { size: number }) => {
  // event: Promise<void>;
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <TitleForm onSubmit={submitHandler}>
      <TitleInput type="text" size={size} defaultValue={'칸반보드이름 여기'} />
    </TitleForm>
  );
};

const TitleForm = styled.form`
  display: inline-block;
  width: 90%;
  box-sizing: border-box;
`;

const TitleInput = styled.input<{ size: number }>`
  margin: 20px 12px;
  display: inline-block;
  font-size: ${({ size }) => (size ? size : 16)}px;
  font-weight: 700;

  :focus {
    background-color: #fff;
  }
`;
export default TaskTitleForm;
