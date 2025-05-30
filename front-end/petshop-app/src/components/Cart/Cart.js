import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [itens, setItens] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);
  const navigate = useNavigate();

  // Recupera itens do carrinho e calcula preço total
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setItens(cart);
    const total = cart.reduce((sum, item) => sum + item.preco, 0);
    setPrecoTotal(total);
  }, []);

  const handleFinalizar = async () => {
    if (itens.length === 0) return;

    try {
      // Cria um pedido para cada item conforme nova entidade
      await Promise.all(
        itens.map((item) =>
          fetch('http://localhost:8883/pedidos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              idUsuario: 1,       // ID fixo ou recuperado de contexto
              idProduto: item.id,
              valor: item.preco,
              status: 'PENDENTE'
            }),
          })
        )
      );
      alert('Pedido(s) criado(s) com sucesso!');
      localStorage.removeItem('cart');
      setItens([]);
      setPrecoTotal(0);
      navigate('/historico');
    } catch (error) {
      console.error('Erro ao criar pedidos:', error);
      alert('Erro ao finalizar pedido. Tente novamente.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Seu Carrinho</h2>
      {itens.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <h3>Preço Total: R${precoTotal.toFixed(2)}</h3>
          </div>
          {itens.map((item, index) => (
            <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
              <p><strong>{item.nome}</strong></p>
              <p>{item.descricao}</p>
              <p>Preço: R${item.preco.toFixed(2)}</p>
            </div>
          ))}
          <button
            onClick={handleFinalizar}
            disabled={itens.length === 0}
            style={{ marginTop: '20px' }}
          >
            Finalizar Pedido
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
