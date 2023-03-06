import styled from 'styled-components';
import TaskList from './TaskList';
import { graphqlFetcher, Querykeys } from '../../queryClient';
import { useQuery } from 'react-query';
import { GET_LISTS } from '../../graphql/lists';
import { List } from '../../types/lists';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { listAtom } from '../../store';
import Loading from '../Loading';
import { Suspense, useEffect } from 'react';
import SuspenseWrapper from '../SuspenseWrapper';

const TaskBoard = () => {
  const { data } = useQuery<{ lists: List[] }>(Querykeys.LISTS, () => graphqlFetcher(GET_LISTS), {
    suspense: true,
  });
  const [boardListValue, setBoardListValue] = useRecoilState(listAtom);
  useEffect(() => {
    if (data) {
      setBoardListValue(data.lists.map(({ state }) => state));
    }
  }, [data, setBoardListValue]);
  return (
    <TaskBoardWrapper>
      <TaskBoardTitle>칸반보드</TaskBoardTitle>
      <TaskListWrapper>
        {data?.lists.map((lists, idx) => (
          <TaskList key={lists.state} title={boardListValue[idx]} list={lists.list} />
        ))}
      </TaskListWrapper>

      {/* {isLoading && <Loading />} */}
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
