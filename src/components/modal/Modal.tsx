import styled from 'styled-components';
import Input from './Input';
const Modal = () => {
  return (
    <ModalContainer>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
        <Input type="text" options={{ placeholder: '담당자 찾기' }}></Input>
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
`;
const Form = styled.form`
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
export default Modal;
