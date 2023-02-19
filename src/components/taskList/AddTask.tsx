import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

const AddTask = ({ status, textContent }: { status: string; textContent: string }) => {
  const navigate = useNavigate();
  return (
    <Link to={`/?mode=add&state=${status}`}>
      <AddTaskBtn>
        <AiOutlinePlus size="16px" />
        <span>{textContent}</span>
      </AddTaskBtn>
    </Link>
  );
};

const AddTaskBtn = styled.button`
  border-radius: 3px;
  padding: 12px;
  width: calc(100% - 8px);
  margin: 4px auto 0;
  box-sizing: border-box;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  cursor: pointer;
  :hover,
  :active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
export default AddTask;
