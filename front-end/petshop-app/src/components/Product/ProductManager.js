import { useEffect, useState } from 'react';

function ProductManager() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nome: '',
    tipo: '',
    descricao: '',
    peso: '',
    preco: '',
    disponibilidade: false
  });

  // Carrega todos os produtos
  const carregarProdutos = async () => {
    try {
      const response = await fetch('http://localhost:8881/produtos');
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  // Atualiza o estado do formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Submete formulário para criar ou atualizar
  const handleSubmit = async (e) => {
    e.preventDefault();

    const metodo = form.id ? 'PUT' : 'POST';
    const url = form.id
      ? `http://localhost:8881/produtos/${form.id}`
      : `http://localhost:8881/produtos`;

    try {
      await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          tipo: form.tipo,
          descricao: form.descricao,
          peso: parseFloat(form.peso),
          preco: parseFloat(form.preco),
          disponibilidade: form.disponibilidade
        })
      });
      setForm({ id: null, nome: '', tipo: '', descricao: '', peso: '', preco: '', disponibilidade: false });
      carregarProdutos();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  // Preenche formulário para edição
  const editarProduto = (produto) => {
    setForm({
      id: produto.id,
      nome: produto.nome,
      tipo: produto.tipo,
      descricao: produto.descricao,
      peso: produto.peso,
      preco: produto.preco,
      disponibilidade: produto.disponibilidade
    });
  };

  // Exclui um produto
  const excluirProduto = async (id) => {
    try {
      await fetch(`http://localhost:8881/produtos/${id}`, { method: 'DELETE' });
      carregarProdutos();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gerenciar Produtos</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={form.tipo}
          onChange={handleChange}
          required
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="peso"
          placeholder="Peso (em kg)"
          value={form.peso}
          onChange={handleChange}
          required
          step="0.01"
        />
        <input
          type="number"
          name="preco"
          placeholder="Preço (R$)"
          value={form.preco}
          onChange={handleChange}
          required
          step="0.01"
        />
        <label>
          <input
            type="checkbox"
            name="disponibilidade"
            checked={form.disponibilidade}
            onChange={handleChange}
          />{' '}
          Disponível
        </label>
        <button type="submit">{form.id ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      <ul>
        {produtos.map((produto) => (
          <li key={produto.id} style={{ marginBottom: '15px' }}>
            <strong>{produto.nome}</strong> ({produto.tipo}) - R$ {produto.preco} <br />
            Peso: {produto.peso} kg | {produto.disponibilidade ? 'Disponível' : 'Indisponível'}<br />
            {produto.descricao} <br />
            <button onClick={() => editarProduto(produto)} style={{ marginRight: '10px' }}>Editar</button>
            <button onClick={() => excluirProduto(produto.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductManager;
