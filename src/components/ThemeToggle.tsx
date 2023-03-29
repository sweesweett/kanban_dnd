import styled from 'styled-components';
import { useState } from 'react';
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';
const ThemeToggle = () => {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <ToggleWrapper isToggled={isToggled}>
      <ToggleBtn onClick={() => setIsToggled(!isToggled)} isToggled={isToggled} />
      <ToggleIcons>
        <BsFillSunFill size={16} color={'white'} />
        <BsMoonStarsFill size={16} color={'black'} />
      </ToggleIcons>
    </ToggleWrapper>
  );
};
const ToggleWrapper = styled.div<{ isToggled: boolean }>`
  background-color: ${({ isToggled }) => (isToggled ? 'gray' : '#a8edea')};
  width: 60px;
  height: 30px;
  position: fixed;
  top: 50px;
  right: 30px;
  border-radius: 15px;
  box-shadow: inset -1px 1px 10px rgba(0, 0, 0, 0.4), 0px 0px 6px rgba(255, 255, 255, 0.4);
  transition: background-color 0.5s;
`;
const ToggleIcons = styled.div`
  display: flex;
  height: 30px;
  justify-content: space-between;
  align-items: center;
  margin: 0 8px;
`;
const ToggleBtn = styled.div<{ isToggled: boolean }>`
  content: '';
  width: 30px;
  height: 30px;
  background-color: white;
  position: absolute;
  border-radius: 50%;
  left: 0;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  transform: translateX(${({ isToggled }) => (isToggled ? '30px' : '0')});
  transition: transform 0.5s;
  cursor: pointer;
  z-index: 1;
`;
export default ThemeToggle;
