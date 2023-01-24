import styled from 'styled-components';
const TaskItem = () => {
  return (
    <TaskLi draggable>
      <span>테스트중~</span>
      <CircleIcon>윤</CircleIcon>
    </TaskLi>
  );
};
const TaskLi = styled.li`
  border-radius: 8px;
  padding: 12px;
  margin: 12px 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
`;
export const CircleIcon = styled.div`
  border-radius: 50%;
  background-color: #a8edea;
  align-self: flex-end;
  padding: 4px;
`;
export default TaskItem;
