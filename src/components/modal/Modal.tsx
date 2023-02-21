import { FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import Input, { Label } from './Input';
import CloseBar from './CloseBar';
import { useNavigate } from 'react-router-dom';
import { graphqlFetcher, Querykeys } from '../../queryClient';
import { useQuery } from 'react-query';
import { GET_ITEM } from '../../graphql/lists';
import { ListContent } from '../../types/lists';
import { useSetRecoilState } from 'recoil';
import { SearchAtom } from '../../store';
import useSearchParams from '../../hooks/useSearchParams';
import SearchManager from './SearchManager';
import useForm from '../../hooks/useForm';
import ModalSelect from './ModalSelect';
import DeleteBtn from './DeleteBtn';

const Modal = () => {
  const { mode, state, id } = useSearchParams(['mode', 'state', 'id']);
  const setSearchValue = useSetRecoilState(SearchAtom);
  const navigate = useNavigate();
  const { data } = useQuery<{ item: ListContent }>(
    [Querykeys.ITEM, id, state],
    () => graphqlFetcher(GET_ITEM, { id, state }),
    {
      enabled: !!id,
    },
  );
  // TODO: 모달 컴포넌트  리액트쿼리 option 더 알아보고 리팩토링 하기
  const { getFormData } = useForm(mode);
  useEffect(() => {
    if (data) {
      const manager = data?.item.manager;
      setSearchValue(manager || '');
    }

    return () => setSearchValue('');
  }, [setSearchValue, data]);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getFormData(e.currentTarget, id, state);
  };
  return (
    <ModalContainer>
      <CloseBar modalTitle={mode === 'edit' ? 'Edit a card' : 'Add a card'} />
      <Form onSubmit={submitHandler}>
        {mode === 'edit' && <DeleteBtn id={id} state={state} />}
        <Input
          type="text"
          name="title"
          label="제목"
          options={{ defaultValue: data?.item.title, placeholder: '제목을 입력해 주세요', required: true }}
        />
        <ModalSelect state={state} />
        <Label htmlFor="content">내용</Label>
        <Textarea name="content" defaultValue={data?.item.content} required />
        <Input
          type="datetime-local"
          name="endDate"
          label="마감일"
          options={{ min: new Date().toISOString().slice(0, -8), defaultValue: data?.item.endDate, required: true }}
        />
        <SearchManager />
        <ModalBtns>
          <Button color="#a8edea" type="submit">
            저장
          </Button>
          <Button color="#fed6e3" type="button" onClick={() => navigate('/')}>
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
  padding: 28px 20px;
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
  position: relative;
`;
const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  height: 100px;
  border: none;
  :focus {
    outline: 2px solid rgba(0, 0, 0, 0.3);
  }
  option {
    border: none;
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
  background-color: ${({ color }) => color || 'none'};
`;
export default Modal;
