import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState(''); // 'sucesso' ou 'erro'
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      const response = await fetch('http://localhost:8882/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const text = await response.text();

      if (response.ok) {
        setMensagem(text || 'Login realizado com sucesso!');
        setTipoMensagem('sucesso');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMensagem(text || 'Erro ao fazer login.');
        setTipoMensagem('erro');
      }
    } catch (error) {
      console.error('Erro no fetch:', error);
      setMensagem('Erro ao conectar com o servidor.');
      setTipoMensagem('erro');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
        />
        <button type="submit">Entrar</button>
      </form>

      {mensagem && (
        <p style={{
          color: tipoMensagem === 'sucesso' ? 'green' : 'red',
          marginTop: '15px',
          textAlign: 'center'
        }}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default Login;
