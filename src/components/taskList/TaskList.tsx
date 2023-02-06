import styled from 'styled-components';
import TaskItem from './TaskItem';
import TaskTitleForm from './TaskTitleForm';
import AddTask from './AddTask';
import { ListContent } from '../../types/lists';

import { PUT_LIST_TITLE } from '../../graphql/lists';

const TaskList = ({ title, list }: { title: string; list: ListContent[] }) => {
  return (
    <TaskListContainer>
      <TaskTitleInfo>
        <CountBadge>{list.length}</CountBadge>
        <TaskTitleForm size={16} title={title} eventName={PUT_LIST_TITLE} />
      </TaskTitleInfo>

      <TaskListUl>
        {list.map((item) => (
          <TaskItem key={item.id} title={item.title} manager={item.manager} />
        ))}
      </TaskListUl>
      <AddTask textContent="Add a card" status="task" />
    </TaskListContainer>
  );
};
const TaskListContainer = styled.div`
  width: 300px;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.5);
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
  background-color: #f39db8;
  color: white;
  text-align: center;
`;

const TaskListUl = styled.ul`
  min-height: 100%;
  max-height: 50vh;
  overflow-y: auto;
`;

export default TaskList;
