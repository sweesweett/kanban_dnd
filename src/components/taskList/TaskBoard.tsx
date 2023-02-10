import { memo } from 'react';
import styled from 'styled-components';
import TaskList from './TaskList';
import TaskTitleForm from './TaskTitleForm';
import { graphqlFetcher, Querykeys } from '../../queryClient';
import { useQuery } from 'react-query';
import GET_LISTS from '../../graphql/lists';
import { List } from '../../types/lists';
import { useRecoilState } from 'recoil';
import { listAtom } from '../../store';
import Loading from '../Loading';

const TaskBoard = () => {
  const [boardValue, setBoardValue] = useRecoilState(listAtom);
  const { isLoading } = useQuery<{ lists: List[] }>(Querykeys.LISTS, () => graphqlFetcher(GET_LISTS), {
    onSuccess: (data) => {
      setBoardValue(data.lists);
    },
  });
  return (
    <TaskBoardWrapper>
      <TaskTitleForm size={24} title="칸반보드" />

      <TaskListWrapper>
        {boardValue?.map((lists) => (
          <TaskList key={lists.state} title={lists.state} list={lists.list} />
        ))}
      </TaskListWrapper>
      {isLoading && <Loading />}
    </TaskBoardWrapper>
  );
};
const TaskBoardWrapper = styled.section`
  margin: 50px 30px;
  min-height: 80vh;
`;
const TaskListWrapper = styled.div`
  margin: 20px;
  display: flex;
  gap: 30px;
`;

export default TaskBoard;
