import styled from 'styled-components';

const Loading = () => {
  return (
    <LoadingWrapper>
      <LoadingCircle />
      <LoadingCircle />
      <LoadingCircle />
    </LoadingWrapper>
  );
};
export default Loading;

// TODO: Css 상황에 맞게 prop로 받아서 바꾸기
const LoadingWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.1);
`;
const LoadingCircle = styled.div`
  position: relative;
  width: 15%;
  max-width: 50px;
  height: 15%;
  max-height: 50px;
  border-radius: 50%;
  /* box-shadow: inset -1px -2px 30px rgba(0, 0, 0, 0.1); */
  &:nth-last-child(1) {
    background-color: #7ae5e0;
    animation: loading 1.2s 0.3s ease-in-out infinite;
  }
  &:nth-last-child(2) {
    background-color: #9ff7bd;
    animation: loading 1.2s 0.6s ease-in-out infinite;
  }
  &:nth-last-child(3) {
    background-color: #f8b5ca;
    animation: loading 1.2s 0.9s ease-in-out infinite;
  }

  @keyframes loading {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0, 20px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;
