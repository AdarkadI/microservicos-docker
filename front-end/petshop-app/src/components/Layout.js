import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: 15 }}>Home</Link>
        <Link to="/carrinho" style={{ marginRight: 15 }}>Carrinho</Link>
        <Link to="/historico" style={{ marginRight: 15 }}>Histórico de Pedidos</Link>
        <Link to="/gerenciar" style={{ marginRight: 15 }}>Gerenciar Produtos</Link>
        <Link to="/login" style={{ marginRight: 15 }}>Login</Link>
        <Link to="/register">Registrar</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
