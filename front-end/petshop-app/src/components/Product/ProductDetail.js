import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    const fetchProduto = async () => {
      const response = await fetch(`http://localhost:8881/produtos/${id}`);
      const data = await response.json();
      setProduto(data);
    };
    fetchProduto();
  }, [id]);

  if (!produto) return <p>Carregando...</p>;

  return (
    <div>
      <img src={produto.imagem} alt={produto.nome} />
      <h2>{produto.nome}</h2>
      <p>{produto.descricao}</p>
      <p>R${produto.preco}</p>
      <button>Adicionar ao Carrinho</button>
    </div>
  );
}

export default ProductDetail;
