use petshop;

-- Tabela de Produtos
CREATE TABLE produto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(100),
    descricao TEXT,
    peso DOUBLE,
    preco DOUBLE,
    disponibilidade BOOLEAN
);

-- Tabela de Pagamentos
CREATE TABLE pagamentos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_pedido BIGINT,
    valor DOUBLE,
    status VARCHAR(50)
);

-- Tabela de Usuários
CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Tabela de Pedidos
CREATE TABLE pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT,
    id_produto BIGINT,
    valor DOUBLE,
    status VARCHAR(50)
);
