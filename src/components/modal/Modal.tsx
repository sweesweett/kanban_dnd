import { FormEvent } from 'react';
import styled from 'styled-components';
import Input from './Input';
import CloseBar from './CloseBar';
import { useNavigate } from 'react-router-dom';
import { graphqlFetcher, Querykeys } from '../../queryClient';
import { useQuery } from 'react-query';
import { GET_ITEM } from '../../graphql/lists';
import { ListContent } from '../../types/lists';
const initialState = {
  item: {
    id: null,
    order: null,
    title: '',
    content: '',
    endDate: '',
    manager: '',
  },
};
const Modal = () => {
  const mode: 'add' | 'edit' = 'edit';
  const [id, state] = [1, 'TO-DO'];
  const navigate = useNavigate();
  const data =
    mode === 'add'
      ? initialState
      : useQuery<{ item: ListContent }>([Querykeys.LISTS, 1, 'TO-DO'], () => graphqlFetcher(GET_ITEM, { id, state }))
          .data;
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <ModalContainer>
      <CloseBar modalTitle={mode === 'add' ? 'Add a card' : 'Edit a card'} />
      <Form onSubmit={submitHandler}>
        <Input
          type="text"
          name="title"
          label="제목"
          options={{ defaultValue: data?.item.title, placeholder: '제목을 입력해 주세요', required: true }}
        ></Input>
        <label htmlFor="status">상태</label>
        <select defaultValue={state} name="status" id="status" required>
          <option value="title">테스트1</option>
          <option value={state}>테스트2</option>
          <option value="title">테스트3</option>
        </select>
        <label htmlFor="content">내용</label>
        <Textarea name="content" defaultValue={data?.item.content} required />
        <Input
          type="datetime-local"
          name="endDate"
          label="마감일"
          options={{ min: new Date().toISOString().slice(0, -8), defaultValue: data?.item.endDate }}
        ></Input>
        <SearchManagerWrapper>
          <Input
            type="text"
            name="manager"
            label="담당자"
            options={{ placeholder: '담당자 찾기', defaultValue: data?.item.manager }}
          ></Input>
          {/* TODO: 담당자 찾기 리액트쿼리로 데이터 받아서 list에 뿌리기
          선택 시, manager input value 그 값으로 설정- 전역관리하거나 modal에서 관리 해야함
          */}

          <DropUl>
            <DropLi>테스트</DropLi>
            <DropLi>테스트</DropLi>
            <DropLi>테스트</DropLi>
            <DropLi>테스트</DropLi>
            <DropLi>테스트</DropLi>
          </DropUl>
        </SearchManagerWrapper>
        <ModalBtns>
          <Button color={'#a8edea'} type="submit">
            저장
          </Button>
          <Button color={'#fed6e3'} type="button" onClick={() => navigate('/')}>
            취소
          </Button>
        </ModalBtns>
      </Form>
    </ModalContainer>
  );
};
const ModalContainer = styled.div`
  background-color: #e1e6e7;
  width: 40vw;
  min-width: 300px;
  max-width: 800px;
  border-radius: 4px;
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
  width: 95%;
  margin: 24px auto 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  height: 100px;
  border: none;
  :focus {
    outline: 2px solid rgba(0, 0, 0, 0.3);
  }
`;
const SearchManagerWrapper = styled.div``;
const DropUl = styled.ul`
  margin-top: 12px;
  height: 40px;
  width: 100%;
  overflow-x: auto;
`;
const DropLi = styled.li`
  display: inline-block;
  margin-right: 8px;
  padding: 4px;
  border-radius: 15px;
  font-size: 14px;
  background-color: white;
  font-weight: 500;
  border: 3px solid #fed6e3;
  cursor: pointer;
  :hover,
  :active {
    border: 3px solid #ffb2cb;
  }
`;
const ModalBtns = styled.div`
  align-self: center;
`;
const Button = styled.button<{ color: string }>`
  display: inline-block;
  padding: 12px;
  margin: 0 8px 0 10px;
  font-weight: 700;
  background-color: ${({ color }) => (color ? color : 'none')};
`;
export default Modal;
