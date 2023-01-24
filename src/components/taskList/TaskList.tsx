import styled from 'styled-components';
import TaskItem, { CircleIcon } from './TaskItem';
import TaskTitleForm from './TaskTitleForm';

const TaskList = () => {
  const dummy = [1, 2, 3, 4, 5];
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
    </TaskListContainer>
  );
};
const TaskListContainer = styled.div`
  width: 300px;
  height: 500px;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
`;
const TaskTitleInfo = styled.div`
  padding: 0 8px;
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

const TaskListUl = styled.ul``;

export default TaskList;
