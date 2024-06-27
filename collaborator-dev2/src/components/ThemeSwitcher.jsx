import React, { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import ThemeToggleButton from './ThemeToggleButton'; // Importa o componente ThemeToggleButton

const ThemeSwitcher = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light'); // Estado para controlar o tema atual

  // Função para alternar entre os temas claro e escuro
  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'; // Alterna entre 'light' e 'dark'
    setCurrentTheme(newTheme); // Atualiza o estado com o novo tema
  };

  const isDarkTheme = currentTheme === 'dark'; // Determina se o tema atual é escuro

  // Configuração do tema com base no estado atual
  const themeConfig = {
    algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : undefined, // Define um algoritmo específico para o tema escuro
    components: {
      Layout: {
        colorBgHeader: '#e7e7e7', // Define a cor de fundo do cabeçalho para todos os layouts
      },
    },
  };

  return (
    <ConfigProvider theme={themeConfig}> {/* Configura o provedor de configuração de tema */}
      {children} {/* Renderiza os componentes filhos dentro do ConfigProvider */}
      <ThemeToggleButton toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} /> {/* Renderiza o botão de alternância de tema */}
    </ConfigProvider>
  );
};

export default ThemeSwitcher;
