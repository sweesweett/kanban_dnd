import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { dndSelector } from '../../store';

interface TaskItemProps {
  title: string;
  manager: string | null;
  id: string;
  state: string;
  order: number;
}
const TaskItem = ({ title, manager, id, state, order }: TaskItemProps) => {
  const [dndDrag, setDndDrag] = useRecoilState(dndSelector('drag'));
  const [dndDrop, setDndDrop] = useRecoilState(dndSelector('drop'));

  const onDragStart = () => {
    setDndDrag({ id, state, order });
  };

  const onDragEnd = () => {
    if (dndDrag.id === id) {
      setDndDrop({ ...dndDrag });
    }
  };
  const onDragEnter = () => {
    if (dndDrag.id !== id) {
      setDndDrop({ id, state, order });
    } else {
      setDndDrop({ ...dndDrag });
    }
  };
  const previewHandler = () => {
    if (dndDrag.state !== dndDrop.state) {
      return 'top';
    }
    if (dndDrag.order > dndDrop.order) {
      return 'top';
    }
    return 'bottom';
  };
  return (
    <TaskLi draggable onDragStart={onDragStart} onDragEnd={onDragEnd} onDragEnter={onDragEnter}>
      <LinkStyled to={`/?mode=edit&state=${state}&id=${id}`} position={previewHandler()}>
        <TaskLiContent>
          <span>{title}</span>
          {manager && <CircleIcon>{manager.slice(0, 1)}</CircleIcon>}
        </TaskLiContent>
        {dndDrop.id === id && dndDrag.id !== dndDrop.id && <EmptySpace />}
      </LinkStyled>
    </TaskLi>
  );
};

const LinkStyled = styled(Link)<{ position: 'top' | 'bottom' | undefined }>`
  display: flex;
  flex-direction: ${({ position }) => (position === 'top' ? 'column-reverse' : 'column')};
  -webkit-user-drag: none;
  cursor: initial;
`;
const TaskLi = styled.li`
  margin: 12px 4px;
`;
const TaskLiContent = styled.div`
  border-radius: 8px;
  padding: 12px;
  cursor: grab;
  background-color: ${({ theme }) => theme.itemBg};
  display: flex;
  flex-direction: column;
  position: relative;
  font-weight: 500;
  color: ${({ theme }) => theme.color};
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
  background-color: ${({ theme }) => theme.toggleBg};
  align-self: flex-end;
  font-size: 14px;
  font-weight: 700;
  color: white;
  text-align: center;
  line-height: 20px;
`;
export default TaskItem;
