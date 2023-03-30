import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const AddTask = ({ status, textContent }: { status: string; textContent: string }) => {
  return (
    <StyledLink to={`/?mode=add&state=${status}`}>
      <AddTaskBtn>
        <AiOutlinePlus size="16px" />
        <span>{textContent}</span>
      </AddTaskBtn>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

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
  color: ${({ theme }) => theme.color};
  cursor: pointer;
  :hover,
  :active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
export default AddTask;
