// import React, { useState } from 'react';
// import { ConfigProvider, theme } from 'antd';

// // eslint-disable-next-line react/prop-types
// const ThemeSwitcher = ({ children }) => {
//   const [currentTheme, setCurrentTheme] = useState('light');

//   const toggleTheme = () => {
//     const newTheme = currentTheme === 'light'? 'dark' : 'light';
//     setCurrentTheme(newTheme);
//   };

//   const themeConfig = {
//     algorithm: currentTheme === 'dark'? theme.darkAlgorithm : undefined,
//     components: {
//       Layout: {
//         colorBgHeader: '#e7e7e7',
//       },
//     },
//   };

//   return (
//     <ConfigProvider theme={themeConfig}>
//       {children}
//       <button onClick={toggleTheme}>Toggle Theme</button>
//     </ConfigProvider>
//   );
// };

// export default ThemeSwitcher;



import React, { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import ThemeToggleButton from './ThemeToggleButton'; // Importe o componente ThemeToggleButton

const ThemeSwitcher = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light'? 'dark' : 'light';
    setCurrentTheme(newTheme);
  };

  const isDarkTheme = currentTheme === 'dark'; // Determina se o tema é escuro

  const themeConfig = {
    algorithm: currentTheme === 'dark'? theme.darkAlgorithm : undefined,
    components: {
      Layout: {
        colorBgHeader: '#e7e7e7',
      },
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      {children}
      <ThemeToggleButton toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
    </ConfigProvider>
  );
};

export default ThemeSwitcher;
