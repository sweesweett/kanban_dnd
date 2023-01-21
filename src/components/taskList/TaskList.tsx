import styled from 'styled-components';
const TaskList = () => {
  return (
    <TaskListContainer>
      <h2>타이틀</h2>
      <TaskListUl>
        <li>테스트중~</li>
      </TaskListUl>
    </TaskListContainer>
  );
};
const TaskListContainer = styled.div`
  min-width: 200px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.7);
`;
const TaskListUl = styled.ul``;
export default TaskList;
