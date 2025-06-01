# Petshop - Sistema com Microsserviços e Frontend React

Este projeto representa um sistema completo para gerenciamento de um petshop, estruturado em arquitetura de microsserviços. A aplicação possui um frontend desenvolvido em React, chamado `petshop-app`, que serve como interface principal tanto para os clientes quanto para administradores.

## Estrutura do Projeto

O backend é composto por quatro microsserviços desenvolvidos em Java com Spring Boot:

- `ms-catalogo-produtos`: gerenciamento de produtos.
- `ms-pagamentos`: processamento de pagamentos.
- `ms-pedidos`: controle de pedidos e histórico.
- `ms-usuario`: cadastro de usuários e autenticação.

Toda a aplicação é orquestrada por containers Docker utilizando cinco arquivos `docker-compose`, numerados de `1` a `5`, que devem ser executados em ordem para garantir o funcionamento correto de todos os serviços.

## Microsserviços

### ms-catalogo-produtos

Gerencia os produtos disponíveis no petshop, incluindo:

- Cadastro, listagem, atualização e exclusão.
- Consulta por categorias.
- Controle de estoque.

### ms-pagamentos

Responsável pelo fluxo de pagamentos, incluindo:

- Processamento simulado de transações.
- Controle do status dos pagamentos vinculados aos pedidos.

### ms-pedidos

Gerencia os pedidos realizados pelos clientes:

- Criação e controle de pedidos.
- Acompanhamento do histórico.
- Atualização de status (em andamento, concluído, etc).

### ms-usuario

Responsável por autenticação e gerenciamento de usuários:

- Cadastro de novos usuários.
- Login dos usuarios

## Frontend - petshop-app

Desenvolvido em React, o frontend consome as APIs REST dos microsserviços e oferece:

- Interface para navegação de produtos.
- Adição de itens ao carrinho e finalização de pedidos.
- Processamento de pagamento e acompanhamento de status.
- Área administrativa para gerenciamento do sistema.

## Execução com Docker

É necessário ter Docker e Docker Compose instalados.

1. Clone o repositório do projeto.
2. Navegue até o diretório do projeto.
3. Execute os arquivos `docker-compose` em ordem:

```bash
1-docker-compose-mysql.yml - banco de dados
2-docker-compose-catalogo.yml - ms-catalogo-produtos
3-docker-compose-usuario.yml - ms-pagamentos
4-docker-compose-pedidos.yml - ms-pedidos
5-docker-compose-pagamentos.yml - ms-usuario
