import { useState, useEffect } from 'react';

function Cart() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setItens(cart);
  }, []);

  const handleFinalizar = async () => {
    const response = await fetch('http://localhost:8883/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itens }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Pedido realizado com sucesso');
      localStorage.removeItem('cart');
      setItens([]);
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      {itens.map((item, index) => (
        <div key={index}>
          <p>{item.nome}</p>
          <p>R${item.preco}</p>
        </div>
      ))}
      <button onClick={handleFinalizar}>Finalizar Pedido</button>
    </div>
  );
}

export default Cart;
