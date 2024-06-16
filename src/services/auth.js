import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://sua-api.com/auth'; // Substitua pela URL da sua API

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (mode) => {
    try {
      const response = await axios.post(`${API_URL}/${mode}`, { email, password });
      console.log('Resposta da autenticação:', response.data);
    } catch (error) {
      console.error('Erro durante a autenticação:', error);
    }
  };

  // return (
  //   <div>
  //     <h2>Autenticação</h2>
  //     <label>
  //       Email:
  //       <input
  //         type="email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />
  //     </label>
  //     <label>
  //       Senha:
  //       <input
  //         type="password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //     </label>
  //     <button onClick={() => handleSubmit('signup')}>Registrar</button>
  //     <button onClick={() => handleSubmit('login')}>Entrar</button>
  //   </div>
  // );
};

export default Auth;
