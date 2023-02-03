import styled from 'styled-components';
import Modal from './Modal';

const ModalWrapper = () => {
  return (
    <>
      <Bg />
      <ModalContent>
        <Modal />
      </ModalContent>
    </>
  );
};

const Bg = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;
const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export default ModalWrapper;
