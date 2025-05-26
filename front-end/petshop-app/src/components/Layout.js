import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav style={{ padding: '10px', backgroundColor: '#eee', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: 15 }}>Home</Link>
        <Link to="/login" style={{ marginRight: 15 }}>Login</Link>
        <Link to="/register" style={{ marginRight: 15 }}>Cadastro</Link>
        <Link to="/carrinho" style={{ marginRight: 15 }}>Carrinho</Link>
        <Link to="/historico" style={{ marginRight: 15 }}>Histórico de Pedidos</Link>
      </nav>
      {/* Aqui o conteúdo de cada página será renderizado */}
      <Outlet />
    </div>
  );
}

export default Layout;