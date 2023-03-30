import styled from 'styled-components';
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { themeSelector } from '../store';
const ThemeToggle = () => {
  const [theme, setTheme] = useRecoilState(themeSelector);
  return (
    <ToggleWrapper
      onClick={() => {
        setTheme('');
      }}
    >
      <ToggleBtn themeMode={theme} />
      <ToggleIcons>
        <BsFillSunFill size={16} color={'white'} />
        <BsMoonStarsFill size={16} color={'black'} />
      </ToggleIcons>
    </ToggleWrapper>
  );
};
const ToggleWrapper = styled.div`
  background-color: ${({ theme }) => theme.toggleBg};
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
  cursor: pointer;
`;
const ToggleBtn = styled.div<{ themeMode: string }>`
  content: '';
  width: 30px;
  height: 30px;
  background-color: white;
  position: absolute;
  border-radius: 50%;
  left: 0;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  transform: translateX(${({ themeMode }) => (themeMode === 'dark' ? '30px' : '0')});
  transition: transform 0.5s;
  cursor: pointer;
  z-index: 1;
`;
export default ThemeToggle;
