import styled from 'styled-components';
import { GrPowerReset } from 'react-icons/gr';

const ErrorIndicator = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <ErrorWrapper>
      <ErrorContent>
        <p>예상하지 못한 문제가 발생했어요!</p>
        <ErrorContentBtn type="button" onClick={onClickHandler}>
          <GrPowerReset size={16} />
          <span>다시 시도하기</span>
        </ErrorContentBtn>
      </ErrorContent>
    </ErrorWrapper>
  );
};

const ErrorWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 5;
`;
const ErrorContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  min-width: 300px;
  width: 50vw;
  max-width: 600px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-weight: 700;
`;
const ErrorContentBtn = styled.button`
  display: flex;
  align-items: center;
  border-radius: 1px solid black;
  padding: 8px;
  gap: 12px;
`;
export default ErrorIndicator;
