import { useEffect, useState } from 'react';
import ProductCard from './Product/ProductCard';

function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      const response = await fetch('http://localhost:8881/produtos/disponiveis');
      const data = await response.json();
      setProdutos(data);
    };
    fetchProdutos();
  }, []);

  return (
    <div>
      {produtos.map((produto) => (
        <ProductCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
}

export default Home;
