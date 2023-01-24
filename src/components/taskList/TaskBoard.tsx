import styled from 'styled-components';
import TaskList from './TaskList';
import TaskTitleForm from './TaskTitleForm';
const TaskBoard = () => {
  return (
    <TaskBoardWrapper>
      <TaskTitleForm size={24} />
      <TaskListWrapper>
        <TaskList />
        <TaskList />
        <TaskList />
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
