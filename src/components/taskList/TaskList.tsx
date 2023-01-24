import styled from 'styled-components';
import TaskItem, { CircleIcon } from './TaskItem';
import TaskTitleForm from './TaskTitleForm';
import AddTask from './AddTask';
const TaskList = () => {
  const dummy = [1, 2];
  return (
    <TaskListContainer>
      <TaskTitleInfo>
        <CountBadge>5</CountBadge>
        <TaskTitleForm size={16} />
      </TaskTitleInfo>

      <TaskListUl>
        {dummy.map((item) => (
          <TaskItem />
        ))}
      </TaskListUl>
      <AddTask textContent="Add a card" status={'task'} />
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
