import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TaskItem = ({ title, manager }: { title: string; manager: string | null }) => {
  return (
    <Link to="/?mode=edit&state=TO_DO&id=1">
      <TaskLi draggable>
        <span>{title}</span>
        {manager && <CircleIcon>{manager.slice(0, 1)}</CircleIcon>}
      </TaskLi>
    </Link>
  );
};
const TaskLi = styled.li`
  border-radius: 8px;
  padding: 12px;
  margin: 12px 4px;
  background-color: white;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
`;
export const CircleIcon = styled.div`
  border-radius: 50%;
  background-color: #77d8d4;
  align-self: flex-end;
  padding: 4px;
  font-size: 14px;
  font-weight: 700;
  color: white;
`;
export default TaskItem;
