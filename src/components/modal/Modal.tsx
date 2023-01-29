import { FormEvent } from 'react';
import styled from 'styled-components';
import Input from './Input';
import CloseBar from './CloseBar';
const Modal = () => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <ModalContainer>
      <CloseBar modalTitle={'add a card'} />
      <Form onSubmit={submitHandler}>
        <Input
          type="text"
          name="title"
          label="제목"
          options={{ defaultValue: '', placeholder: '제목을 입력해 주세요', required: true }}
        ></Input>
        <textarea name="content" />
        <Input
          type="datetime-local"
          name="endDate"
          label="마감일"
          options={{ min: new Date().toISOString().slice(0, -8) }}
        ></Input>
        <Input type="text" name="manager" label="담당자" options={{ placeholder: '담당자 찾기' }}></Input>
        <div>드롭다운 scroll 통신</div>
        <div>
          <button type="submit">저장</button>
          <button type="button">취소</button>
        </div>
      </Form>
    </ModalContainer>
  );
};
const ModalContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  width: 40vw;
  min-width: 200px;
  max-width: 800px;
  border-radius: 8px;
  padding: 20px;
  animation: open 0.3s ease-out 1 forwards;
  @keyframes open {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }
`;
const Form = styled.form`
  width: 90%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`;
const Button = styled.button``;
export default Modal;
