# Growtwitter API 🐦

O Growtwitter é uma API REST robusta desenvolvida como projeto final para o curso de Web Full Stack da Growdev. A aplicação simula as funcionalidades principais de uma rede social, permitindo a interação em tempo real entre usuários através de tweets, respostas, curtidas e um sistema dinâmico de seguidores. O objetivo do projeto é consolidar conhecimentos em desenvolvimento backend, focando em escalabilidade, organização de código com Programação Orientada a Objetos (POO) e persistência de dados relacionais.

## 🛠 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Node.js**: Runtime JavaScript para o backend.
- **Express**: Framework web para gerenciamento de rotas e middlewares.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática e segurança ao código.
- **Prisma ORM**: Ferramenta para mapeamento e manipulação do banco de dados PostgreSQL.
- **JWT (JSON Web Token)**: Implementação de segurança para autenticação e proteção de rotas.
- **BCrypt**: Criptografia de senhas para garantir a segurança dos dados dos usuários.
- **Docker**: Containerização para padronização do ambiente de desenvolvimento e deploy.
- **PostgreSQL**: Banco de dados relacional para persistência de dados.

## 📋 Funcionalidades e Regras de Negócio

- **Autenticação Segura**: Cadastro e Login de usuários com geração de tokens JWT.
- **Sistema de Tweets**: Criação de tweets e suporte a replies (um tweet respondendo a outro).
- **Interatividade**: Sistema de curtidas (likes) em tweets e replies.
- **Social Graph**: Mecanismo de "seguir" e "deixar de seguir" usuários.
- **Feed Personalizado**: Endpoint que retorna os tweets do próprio usuário e das pessoas que ele segue.
- **Perfil do Usuário**: Consulta de dados, incluindo a lista de tweets e seguidores.

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### Configuração

1. Clone o repositório:

   ```bash
   git clone [https://github.com/fabricio-milanio/growtwitter-api](https://github.com/fabricio-milanio/growtwitter-api)
   cd growtwitter-api

   ```

2. Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env-example`:

   ```env
   PORT=3030
   POSTGRES_USER=seu_usuario
   POSTGRES_PASSWORD=sua_senha
   POSTGRES_DB=seu_banco
   DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/seu_banco?schema=public"
   ```

3. Ajuste as configurações no `prisma/schema.prisma` conforme necessário para o seu banco de dados.

## Instalação e Execução

### Com Docker (Recomendado)

1. Certifique-se de que o Docker e Docker Compose estão instalados e rodando.

2. Execute o comando para construir e iniciar os containers:

   ```bash
   docker compose up --build
   ```

3. A API estará disponível em `http://localhost:3030`.

4. O Prisma Studio (interface gráfica para o banco) estará disponível em `http://localhost:5555`.

5. Para parar os containers:
   ```bash
   docker compose down
   ```

**Nota**: Com Docker, o autoreload está ativado. Qualquer mudança nos arquivos será automaticamente refletida no container.

### Sem Docker (Desenvolvimento Local)

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure o banco de dados PostgreSQL localmente ou use um serviço como ElephantSQL.

3. Execute as migrações do Prisma:

   ```bash
   npx prisma migrate dev
   ```

4. Gere o cliente Prisma:

   ```bash
   npx prisma generate
   ```

5. Inicie o servidor em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

6. A API estará disponível em `http://localhost:3030`.

## Estrutura do Projeto

```
├── src/
│   ├── controllers/     # Controladores da API
│   ├── database/        # Configurações do banco de dados
│   ├── dtos/            # Data Transfer Objects
│   ├── envs/            # Configurações de ambiente
│   ├── middlewares/     # Middlewares personalizados
│   ├── models/          # Modelos de dados
│   ├── routes/          # Definições de rotas
│   ├── services/        # Lógica de negócio
│   ├── utils/           # Utilitários
│   ├── app.ts           # Configuração do Express
│   └── server.ts        # Ponto de entrada da aplicação
├── prisma/
│   ├── schema.prisma    # Esquema do banco de dados
│   └── migrations/      # Migrações do Prisma
├── Dockerfile           # Configuração do container da aplicação
├── docker-compose.yml   # Configuração dos serviços Docker
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração do TypeScript
└── readme.md            # Este arquivo
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com autoreload.
- `npm run build`: Compila o TypeScript para JavaScript.
- `npm run start`: Inicia o servidor em produção (após build).

## Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript.
- **Express**: Framework web.
- **TypeScript**: Linguagem de programação.
- **Prisma**: ORM para banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Docker**: Containerização.
- **ts-node-dev**: Ferramenta para desenvolvimento com TypeScript e autoreload.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está sob a licença ISC.
