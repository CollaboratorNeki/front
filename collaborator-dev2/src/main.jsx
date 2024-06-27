import React from 'react'; // Importa o módulo React para usar JSX
import ReactDOM from 'react-dom'; // Importa o ReactDOM para renderizar o aplicativo no DOM
import App from './App'; // Importa o componente principal do aplicativo
import './index.css'; // Importa o arquivo CSS global
import ThemeSwitcher from './components/ThemeSwitcher'; // Importa o componente ThemeSwitcher

// Define o componente Root, que envolve ThemeSwitcher e App
const Root = () => {
  return (
    <ThemeSwitcher>
      <App />
    </ThemeSwitcher>
  );
};

// Cria um root React usando ReactDOM.createRoot e renderiza o componente Root dentro do elemento com id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
