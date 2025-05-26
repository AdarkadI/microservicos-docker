import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUsuario }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  function logar() {
    fetch('http://localhost:8882/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    })
    .then(res => res.json())
    .then(data => {
      setUsuario(data);
      navigate('/');
    });
  }

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" onChange={e => setSenha(e.target.value)} />
      <button onClick={logar}>Entrar</button>
    </div>
  );
}

export default Login;
