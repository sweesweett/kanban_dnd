import styled from 'styled-components';
import TaskList from './TaskList';
import TaskTitleForm from './TaskTitleForm';
const TaskBoard = () => {
  return (
    <TaskBoardWrapper>
      <TaskTitleForm />
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
  background-color: rgba(255, 255, 255, 0.4);
`;
const TaskListWrapper = styled.div`
  margin: 20px;
  display: flex;
  gap: 30px;
`;
export default TaskBoard;
