import styled from 'styled-components';

const ErrorIndicate = () => {
  return <ErrorWrapper>네트워크 에러</ErrorWrapper>;
};

const ErrorWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.1);
`;
export default ErrorIndicate;
