import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './Product/ProductCard';

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Carrega produtos disponíveis
    (async () => {
      try {
        const res = await fetch('http://localhost:8881/produtos/disponiveis');
        const data = await res.json();
        setProdutos(data);
      } catch (err) {
        console.error('Erro buscando produtos:', err);
      }
    })();

    // Inicializa contador do carrinho
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  }, []);

  const addToCart = (produto) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(produto);
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(cart.length);
    // Notificar e redirecionar
    alert(`${produto.nome} adicionado ao carrinho!`);
    navigate('/carrinho');
  };

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '20px' }}>
        <h2>Loja de Rações</h2>
        <div>
          <strong>Carrinho:</strong> {cartCount} produto(s)
        </div>
      </header>

      {produtos.length === 0 ? (
        <p>Carregando produtos...</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {produtos.map((produto) => (
            <ProductCard
              key={produto.id}
              produto={produto}
              onAdd={() => addToCart(produto)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
