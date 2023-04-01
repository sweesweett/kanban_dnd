import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import { themeSelector } from './../store/index';
import { ThemedStyledComponentsModule, DefaultTheme } from 'styled-components';

const darkTheme = {
  background: 'linear-gradient(to top, #09203f 0%, #537895 100%);',
  listBg: 'rgba(0,0,0, 0.3)',
  itemBg: '#537895',
  modalBg: '#537895',
  color: '#f6f6f6',
  colorReversed: 'black',
  toggleBg: 'gray',
  empColor: '#09203f',
  badgeBg: '#77d8d4',
  borderBg: '#17415F',
  submitBtnBg: '#09203f',
  cancelBtnBg: 'gray',
};
const lightTheme = {
  background: 'linear-gradient(to top, #a8edea 0%, #fed6e3 100%);',
  listBg: 'rgba(255, 255, 255, 0.5)',
  itemBg: 'white',
  modalBg: '#e1e6e7',
  color: 'black',
  colorReversed: '#f6f6f6',
  toggleBg: '#a8edea',
  empColor: '#f39db8',
  badgeBg: '#77d8d4',
  borderBg: '#fed6e3',
  submitBtnBg: '#a8edea',
  cancelBtnBg: '#fed6e3',
};
//  ${(props) => props.theme.bg}
const useTheme = () => {
  const mode = useRecoilValue(themeSelector);
  const [theme, setTheme] = useState<DefaultTheme>(lightTheme);
  useEffect(() => {
    if (mode === 'light') {
      setTheme(lightTheme);
    } else if (mode === 'dark') {
      setTheme(darkTheme);
    }
  }, [mode]);
  return theme;
};

export default useTheme;
