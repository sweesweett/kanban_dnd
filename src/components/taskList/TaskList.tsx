import styled from 'styled-components';
import TaskItem from './TaskItem';
import TaskTitleForm from './TaskTitleForm';
import AddTask from './AddTask';
import { DragEvent } from 'react';
import { ListContent, MutationDnd } from '../../types/lists';
import { PUT_DND, PUT_LIST_TITLE } from '../../graphql/lists';
import { useMutation } from 'react-query';
import { getClient, graphqlFetcher, Querykeys } from '../../queryClient';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { dndAtom } from '../../store';

const TaskList = ({ title, list }: { title: string; list: ListContent[] }) => {
  const queryClient = getClient();
  const dndValue = useRecoilValue(dndAtom);
  const dndValueReset = useResetRecoilState(dndAtom);
  const fetcher = useMutation((data: MutationDnd) => graphqlFetcher(PUT_DND, data), {
    onSuccess: () => {
      dndValueReset();
      void queryClient.invalidateQueries({ queryKey: [Querykeys.LISTS] });
    },
    onError: (err: string) => {
      console.log(`Error:${err}`);
    },
  });
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { drag, drop } = dndValue;
    if (drag.state === drop.state && drag.id === drop.id) {
      if (drag.state !== title) {
        fetcher.mutate({ drag: { id: drag.id, state: drag.state }, drop: { id: '', state: title } });
      }
    } else if (drop.state !== title) {
      fetcher.mutate({ drag: { id: drag.id, state: drag.state }, drop: { id: '', state: title } });
    } else {
      fetcher.mutate(dndValue);
    }
  };

  return (
    <TaskListContainer onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
      <TaskTitleInfo>
        <CountBadge>{list.length}</CountBadge>
        <TaskTitleForm size={16} title={title} eventName={PUT_LIST_TITLE} />
      </TaskTitleInfo>
      <TaskListUl>
        {list.map((item) => (
          <TaskItem
            key={item.id}
            title={item.title}
            state={title}
            manager={item.manager}
            id={item.id}
            order={item.order}
          />
        ))}
      </TaskListUl>
      <AddTask textContent="Add a card" status={title} />
    </TaskListContainer>
  );
};
const TaskListContainer = styled.div`
  width: 300px;
  padding: 16px;
  background-color: ${({ theme }) => theme.listBg};
  border-radius: 8px;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
  height: max-content;
`;
const TaskTitleInfo = styled.div`
  padding: 0 8px;
  display: flex;
  align-items: center;
`;
const CountBadge = styled.span`
  border-radius: 50%;
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.empColor};
  color: white;
  text-align: center;
`;

const TaskListUl = styled.ul`
  min-height: 100%;
  max-height: 50vh;
  overflow-y: auto;
`;

export default TaskList;
