import { FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import Input, { Label } from './Input';
import CloseBar from './CloseBar';
import { useNavigate } from 'react-router-dom';
import { graphqlFetcher, Querykeys } from '../../queryClient';
import { useQuery } from 'react-query';
import { GET_ITEM } from '../../graphql/lists';
import { FamilyListValue } from '../../types/lists';
import { useSetRecoilState } from 'recoil';
import { SearchAtom } from '../../store';
import useSearchParams from '../../hooks/useSearchParams';
import SearchManager from './SearchManager';
import useForm from '../../hooks/useForm';
import ModalSelect from './ModalSelect';
import DeleteBtn from './DeleteBtn';
import { ClientError } from 'graphql-request/dist/types';

const Modal = () => {
  const { mode, state, id } = useSearchParams(['mode', 'state', 'id']);
  const setSearchValue = useSetRecoilState(SearchAtom);
  const navigate = useNavigate();
  const { data } = useQuery<Pick<FamilyListValue, 'item'>, ClientError>(
    [Querykeys.ITEM, id, state],
    () => graphqlFetcher(GET_ITEM, { id, state }),
    {
      enabled: !!id,
      retry: false,
      onError: (err) => {
        if (err.response.status === 404) {
          navigate('/');
          // TODO:사용자에게 안내해줄만한 무언가가 필요한 것 같다!
        }
      },
    },
  );
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
    getFormData(e.currentTarget, state, id);
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
          <Button btnRole="submit" type="submit">
            저장
          </Button>
          <Button btnRole="cancel" type="button" onClick={() => navigate('/')}>
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
  background-color: ${({ theme }) => theme.modalBg};
  color: ${({ theme }) => theme.color};
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
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.listBg};
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
const Button = styled.button<{ btnRole: string }>`
  display: inline-block;
  padding: 12px;
  margin: 0 8px 0 10px;
  font-weight: 700;
  background-color: ${({ btnRole, theme }) => (btnRole === 'submit' ? theme.submitBtnBg : theme.cancelBtnBg)};
  color: ${({ theme }) => theme.color};
`;
export default Modal;
