import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout'; // importe o layout
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Cart/Cart';
import OrderHistory from './components/OrderHistory/OrderHistory';
import ProductManager from './components/Product/ProductManager';


function App() {
  return (
    <Router>
      <Routes>
        {/* Coloque o layout como wrapper */}
        <Route path="/" element={<Layout />}>
          {/* As rotas filhas são renderizadas dentro do Outlet do Layout */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="produto/:id" element={<ProductDetail />} />
          <Route path="carrinho" element={<Cart />} />
          <Route path="/gerenciar" element={<ProductManager />} />
          <Route path="historico" element={<OrderHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
