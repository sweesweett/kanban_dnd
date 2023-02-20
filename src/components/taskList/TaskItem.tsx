import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { dndSelector } from '../../store';

const TaskItem = ({
  title,
  manager,
  id,
  state,
}: {
  title: string;
  manager: string | null;
  id: string;
  state: string;
}) => {
  const [dndDrag, setDndDrag] = useRecoilState(dndSelector('drag'));
  const [dndDrop, setDndDrop] = useRecoilState(dndSelector('drop'));

  const onDragStart = () => {
    setDndDrag({ id, state });
  };
  const onDragEnd = () => {
    if (dndDrag.id === id) {
      setDndDrop({ ...dndDrag });
    }
  };
  const onDragEnter = () => {
    if (dndDrag.id !== id) {
      setDndDrop({ id, state });
    } else {
      setDndDrop({ ...dndDrag });
    }
  };
  return (
    <>
      {dndDrop.id === id && dndDrag.id !== dndDrop.id && <EmptySpace />}
      <Link to={`/?mode=edit&state=${state}&id=${id}`}>
        <TaskLi draggable onDragStart={onDragStart} onDragEnd={onDragEnd} onDragEnter={onDragEnter}>
          <span>{title}</span>
          {manager && <CircleIcon>{manager.slice(0, 1)}</CircleIcon>}
        </TaskLi>
      </Link>
    </>
  );
};
const TaskLi = styled.li`
  border-radius: 8px;
  padding: 12px;
  margin: 12px 4px;
  background-color: white;
  display: flex;
  flex-direction: column;
  cursor: grab;
  position: relative;
  font-weight: 500;
`;
const EmptySpace = styled.div`
  border-radius: 8px;
  padding: 20px 12px;
  margin: 12px 4px;
  background-color: rgba(192, 192, 192, 0.4);
  content: '';
`;
export const CircleIcon = styled.div`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: #77d8d4;
  align-self: flex-end;
  font-size: 14px;
  font-weight: 700;
  color: white;
  text-align: center;
  line-height: 20px;
`;
export default TaskItem;
