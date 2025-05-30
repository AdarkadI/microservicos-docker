import { useEffect, useState } from 'react';

function OrderHistory() {
  const [pedidos, setPedidos] = useState([]);
  const [pagamentos, setPagamentos] = useState({});
  const [loading, setLoading] = useState(true);
  const userId = 1; // substitua pelo usuário logado, se tiver

  useEffect(() => {
    const fetchPedidosEPagamentos = async () => {
      try {
        const resPedidos = await fetch(`http://localhost:8883/pedidos/usuario/${userId}`);
        const pedidosData = await resPedidos.json();

        setPedidos(pedidosData);

        const pagamentosPromises = pedidosData.map(async (pedido) => {
          const resPagamento = await fetch(`http://localhost:8884/pagamentos/pedido/${pedido.id}`);
          const pagamentoData = await resPagamento.json();
          return { pedidoId: pedido.id, pagamento: pagamentoData[0] || null };
        });

        const pagamentosArray = await Promise.all(pagamentosPromises);

        const pagamentosMap = {};
        pagamentosArray.forEach(({ pedidoId, pagamento }) => {
          pagamentosMap[pedidoId] = pagamento;
        });

        setPagamentos(pagamentosMap);
      } catch (error) {
        console.error('Erro ao buscar pedidos ou pagamentos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidosEPagamentos();
  }, []);

  const processarPagamento = async (pedido) => {
    try {
      // Se não existir pagamento, cria um com status vazio, id pode ser null ou 0, o banco gera?
      // Como o id do pagamento é obrigatório (não gerado automaticamente), vamos criar um id único simples:
      const pagamentoExistente = pagamentos[pedido.id];
      const pagamentoPayload = {
        id: pagamentoExistente ? pagamentoExistente.id : Date.now(), // id único via timestamp
        idPedido: pedido.id,
        valor: pedido.valor,
        status: 'PENDENTE' // status inicial, será alterado pela API
      };

      const res = await fetch('http://localhost:8884/pagamentos/processar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pagamentoPayload),
      });

      const pagamentoAtualizado = await res.json();

      // Atualiza estado dos pagamentos para refletir alteração
      setPagamentos((prev) => ({
        ...prev,
        [pedido.id]: pagamentoAtualizado,
      }));

      alert(`Pagamento para pedido ${pedido.id} ${pagamentoAtualizado.status === 'CONFIRMADO' ? 'confirmado!' : 'falhou.'}`);
    } catch (error) {
      console.error('Erro ao processar pagamento', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    }
  };

  if (loading) return <p>Carregando histórico...</p>;

  if (pedidos.length === 0) return <p>Nenhum pedido encontrado.</p>;

  return (
    <div>
      {pedidos.map((pedido) => {
        const pagamento = pagamentos[pedido.id];
        const statusPagamento = pagamento ? pagamento.status : 'Não processado';
        const podeProcessar = !pagamento || pagamento.status !== 'CONFIRMADO';

        return (
          <div key={pedido.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            <p><strong>ID Pedido:</strong> {pedido.id}</p>
            <p><strong>ID Produto:</strong> {pedido.idProduto}</p>
            <p><strong>Status Pedido:</strong> {pedido.status}</p>
            <p><strong>Valor Pedido:</strong> R${pedido.valor.toFixed(2)}</p>
            <p><strong>Status Pagamento:</strong> {statusPagamento}</p>
            {podeProcessar && (
              <button onClick={() => processarPagamento(pedido)}>
                Processar Pagamento
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default OrderHistory;
