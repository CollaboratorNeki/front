import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import ThemeSwitcher from './components/ThemeSwitcher';

const Root = () => {
  return (
    <ThemeSwitcher>
      <App />
    </ThemeSwitcher>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);