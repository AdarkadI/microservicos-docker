USE petshop;

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS produto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(100),
    descricao TEXT,
    peso DOUBLE,
    preco DOUBLE,
    disponibilidade BOOLEAN
);

-- Tabela de Pagamentos
CREATE TABLE IF NOT EXISTS pagamentos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_pedido BIGINT,
    valor DOUBLE,
    status VARCHAR(50)
);

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT,
    id_produto BIGINT,
    valor DOUBLE,
    status VARCHAR(50)
);
