import styled from 'styled-components';
import TaskList from './TaskList';
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
      <TaskBoardTitle>칸반보드</TaskBoardTitle>
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
const TaskBoardTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 12px;
`;
const TaskListWrapper = styled.div`
  margin: 20px;
  display: flex;
  gap: 30px;
`;

export default TaskBoard;
