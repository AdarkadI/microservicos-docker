// src/components/Product/ProductCard.js
import React from 'react';

export default function ProductCard({ produto, onAdd }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%'
    }}>
      <div>
        <h3 style={{ margin: '0 0 10px' }}>{produto.nome}</h3>
        <p style={{ margin: '0 0 5px' }}><strong>Tipo:</strong> {produto.tipo}</p>
        <p style={{ margin: '0 0 10px' }}>{produto.descricao}</p>
        <p style={{ margin: '0 0 5px' }}><strong>Peso:</strong> {produto.peso} kg</p>
        <p style={{ margin: '0 0 10px' }}><strong>Preço:</strong> R${produto.preco.toFixed(2)}</p>
      </div>
      <button 
        onClick={onAdd}
        style={{
          padding: '8px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: '#fff'
        }}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
