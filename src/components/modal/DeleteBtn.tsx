import { AiFillDelete } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { DELETE_ITEM } from '../../graphql/lists';
import { getClient, graphqlFetcher, Querykeys } from '../../queryClient';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DeleteBtn = ({ id, state }: { id: string; state: string }) => {
  const navigate = useNavigate();
  const queryClient = getClient();
  const fetcher = useMutation(() => graphqlFetcher(DELETE_ITEM, { id, state }), {
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [Querykeys.LISTS] });
      navigate('/');
    },
    onError: (err: string) => {
      console.log(`Error:${err}`);
    },
  });
  const deleteHandler = () => {
    fetcher.mutate();
  };
  return (
    <ButtonToDelete type="button" onClick={deleteHandler}>
      <AiFillDelete size="18" />
    </ButtonToDelete>
  );
};
const ButtonToDelete = styled.button`
  position: absolute;
  right: -10px;
`;
export default DeleteBtn;
