function ProductCard({ produto }) {
    return (
      <div>
        <img src={produto.imagem} alt={produto.nome} />
        <h3>{produto.nome}</h3>
        <p>{produto.descricao}</p>
        <p>R${produto.preco}</p>
        <button>Adicionar ao Carrinho</button>
      </div>
    );
  }
  
  export default ProductCard;
  