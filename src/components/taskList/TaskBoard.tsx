import styled from 'styled-components';
import TaskList from './TaskList';
import TaskTitleForm from './TaskTitleForm';

import { graphqlFetcher, Querykeys } from '../../queryClient';
import { useQuery } from 'react-query';
import GET_LISTS from '../../graphql/lists';
import { List } from '../../types/lists';
import { useSetRecoilState } from 'recoil';
import { stateAtom } from '../../store';
import { useEffect } from 'react';

const TaskBoard = () => {
  const { data } = useQuery<{ lists: List[] }>(Querykeys.LISTS, () => graphqlFetcher(GET_LISTS));
  const setState = useSetRecoilState(stateAtom);
  useEffect(() => {
    setState(data ? data?.lists.map((el) => el.state) : []);
  }, [data]);
  return (
    <TaskBoardWrapper>
      <TaskTitleForm size={24} title={'칸반보드'} />
      <TaskListWrapper>
        {data?.lists.map((lists) => (
          <TaskList key={lists.state} title={lists.state} list={lists.list} />
        ))}
      </TaskListWrapper>
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
