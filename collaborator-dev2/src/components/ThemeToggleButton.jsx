import React from 'react';
import { Button } from 'antd'; // Importação do componente de botão do Ant Design
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'; // Importação dos ícones de sol e lua do React Icons

// Componente ThemeToggleButton que recebe toggleTheme e isDarkTheme como props
const ThemeToggleButton = ({ toggleTheme, isDarkTheme }) => {
  return (
    <div className="toggle-theme-btn">
      {/* Botão que alterna entre ícone de sol e lua com base no estado isDarkTheme */}
      <Button
        icon={isDarkTheme ? <HiOutlineSun /> : <HiOutlineMoon />} // Ícone de sol se o tema for claro e lua se for escuro
        onClick={toggleTheme} // Ao clicar no botão, chama a função toggleTheme
      />
    </div>
  );
};

export default ThemeToggleButton; // Exporta o componente ThemeToggleButton
