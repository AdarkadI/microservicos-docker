import { useEffect, useState } from 'react';

function OrderHistory() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      const response = await fetch('http://localhost:8883/pedidos/usuario/1'); // Substituir '1' pelo ID do usuário logado
      const data = await response.json();
      setPedidos(data);
    };
    fetchPedidos();
  }, []);

  return (
    <div>
      {pedidos.map((pedido) => (
        <div key={pedido.id}>
          <p>ID: {pedido.id}</p>
          <p>Data: {pedido.data}</p>
          <p>Status: {pedido.status}</p>
          <p>Total: R${pedido.total}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
