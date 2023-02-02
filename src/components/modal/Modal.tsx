import { FormEvent } from 'react';
import styled from 'styled-components';
import Input from './Input';
import CloseBar from './CloseBar';
import { useNavigate } from 'react-router-dom';
import { graphqlFetcher, Querykeys } from '../../queryClient';
import { useQuery } from 'react-query';
import { GET_ITEM } from '../../graphql/lists';
import { ListContent } from '../../types/lists';
import { useRecoilValue } from 'recoil';
import { stateAtom } from '../../store';
import useSearchParams from '../../hooks/useSearchParams';
import SearchManager from './SearchManager';
const Modal = () => {
  const { mode, state, id } = useSearchParams(['mode', 'state', 'id']);
  const navigate = useNavigate();
  const { data } = useQuery<{ item: ListContent }>(
    [Querykeys.ITEM, id, state],
    () => graphqlFetcher(GET_ITEM, { id, state }),
    {
      enabled: !!id,
    },
  );
  const stateSelect = useRecoilValue(stateAtom);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <ModalContainer>
      <CloseBar modalTitle={mode === 'edit' ? 'Edit a card' : 'Add a card'} />
      <Form onSubmit={submitHandler}>
        <Input
          type="text"
          name="title"
          label="제목"
          options={{ defaultValue: data?.item.title, placeholder: '제목을 입력해 주세요', required: true }}
        ></Input>
        <label htmlFor="status">상태</label>
        <select defaultValue={state ? state : ''} name="status" id="status" required>
          {stateSelect?.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <label htmlFor="content">내용</label>
        <Textarea name="content" defaultValue={data?.item.content} required />
        <Input
          type="datetime-local"
          name="endDate"
          label="마감일"
          options={{ min: new Date().toISOString().slice(0, -8), defaultValue: data?.item.endDate }}
        ></Input>
        <SearchManager defaultValue={data?.item.manager} />
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
