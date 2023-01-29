import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
const CloseBar = ({ modalTitle }: { modalTitle: string }) => {
  const navigate = useNavigate();
  return (
    <div>
      <span>{modalTitle}</span>
      <button type="button" onClick={() => navigate('/')}>
        <IoClose />
      </button>
    </div>
  );
};
export default CloseBar;
