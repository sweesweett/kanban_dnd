import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { dndSelector } from '../../store';

const TaskItem = ({
  title,
  manager,
  id,
  state,
  order,
}: {
  title: string;
  manager: string | null;
  id: string;
  state: string;
  order: number;
}) => {
  const [dndDrag, setDndDrag] = useRecoilState(dndSelector('drag'));
  const [dndDrop, setDndDrop] = useRecoilState(dndSelector('drop'));

  const onDragStart = () => {
    setDndDrag({ id, state, order });
  };
  const onDragEnd = () => {
    console.log(dndDrag.order, dndDrop.order);
    if (dndDrag.id === id) {
      setDndDrop({ ...dndDrag });
    }
    console.log(previewHandler());
  };
  const onDragEnter = () => {
    console.log(id, state);
    if (dndDrag.id !== id) {
      setDndDrop({ id, state, order });
    } else {
      setDndDrop({ ...dndDrag });
    }
  };
  // TODO:EmptySpace 부분 어떻게 해야할지 생각해보기
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
    <LinkStyled to={`/?mode=edit&state=${state}&id=${id}`} position={previewHandler()}>
      <TaskLi draggable onDragStart={onDragStart} onDragEnd={onDragEnd} onDragEnter={onDragEnter}>
        <span>{title}</span>
        {manager && <CircleIcon>{manager.slice(0, 1)}</CircleIcon>}
      </TaskLi>
      {dndDrop.id === id && dndDrag.id !== dndDrop.id && <EmptySpace />}
    </LinkStyled>
  );
};
const LinkStyled = styled(Link)<{ position: 'top' | 'bottom' }>`
  display: flex;
  flex-direction: ${({ position }) => (position === 'top' ? 'column-reverse' : 'column')};
  -webkit-user-drag: none;
  cursor: initial;
`;
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
