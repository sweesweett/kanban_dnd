import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const CloseBar = ({ modalTitle }: { modalTitle: string }) => {
  const navigate = useNavigate();
  return (
    <CloseBarWrapper>
      <span>{modalTitle}</span>
      <CloseBtn type="button" onClick={() => navigate('/')}>
        <IoClose size={24} />
      </CloseBtn>
    </CloseBarWrapper>
  );
};

const CloseBarWrapper = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  font-weight: 700;
  background-color: ${(props) => props.theme.modalBg};
  color: ${(props) => props.theme.color};
  border-radius: 4px 4px 0 0;
`;
const CloseBtn = styled.button`
  position: absolute;
  right: 10px;
  text-align: center;

  :hover,
  :active {
    transform: scale(1.1);
  }
`;
export default CloseBar;
