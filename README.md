Projeto de Microserviços - Sistema de Autenticação e Gerenciamento de Usuários
Este projeto implementa um sistema de autenticação e gerenciamento de usuários distribuído em microserviços. Ele usa tecnologias como Node.js, Kafka, Redis e PostgreSQL, e é orquestrado com Docker e Docker Compose. O sistema é altamente escalável, utilizando comunicação assíncrona via Kafka, persistência de dados no PostgreSQL, e cache de sessão no Redis.

Tecnologias Utilizadas
Node.js: Plataforma de execução JavaScript para criar a API.
Kafka: Sistema de mensagens distribuído usado para comunicação entre os microserviços.
Redis: Banco de dados em memória usado para cache de sessões e tokens de autenticação.
PostgreSQL: Sistema de gerenciamento de banco de dados relacional para armazenar dados de usuários.
Docker e Docker Compose: Ferramentas de containerização e orquestração de containers, garantindo que o projeto possa ser facilmente executado em qualquer ambiente.
Express.js: Framework para criar APIs RESTful em Node.js.
JWT (JSON Web Tokens): Utilizado para autenticação e autorização segura.
Arquitetura
O projeto está dividido em dois microserviços principais:

Auth Service: Responsável por autenticar usuários, gerar tokens JWT e gerenciar sessões.
User Service: Gerencia os dados de usuários e faz a integração com o sistema de mensageria Kafka para comunicação com outros serviços.
Fluxo de Comunicação entre Microserviços
Kafka: Os eventos relacionados a usuários (como criação e atualização de dados) são enviados e consumidos pelos microserviços via Kafka.
Redis: Usado para cache de sessões e tokens de autenticação, permitindo um rápido acesso e uma redução na carga sobre o banco de dados.
PostgreSQL: Usado para persistir dados de usuários no microserviço User.
Estrutura de Pastas
bash
Copiar código
/project-root
│
├── auth/                   # Microserviço de autenticação
│   ├── index.js            # Arquivo principal do serviço de autenticação
│   ├── controllers/        # Lógica de autenticação e criação de tokens JWT
│   ├── routes/             # Rotas da API para login, logout, etc.
│   ├── package.json        # Dependências e scripts do Auth Service
│   └── .env                # Variáveis de ambiente para o Auth Service
│
├── user/                   # Microserviço de gerenciamento de usuários
│   ├── index.js            # Arquivo principal do serviço de usuários
│   ├── controllers/        # Lógica de criação e atualização de usuários
│   ├── routes/             # Rotas da API para operações com usuários
│   ├── package.json        # Dependências e scripts do User Service
│   └── .env                # Variáveis de ambiente para o User Service
│
├── docker-compose.yml       # Arquivo Docker Compose para orquestrar todos os serviços
└── README.md                # Descrição do projeto
Instalação e Configuração
Siga os passos abaixo para rodar o projeto localmente.

Pré-requisitos
Docker
Docker Compose
Node.js
Passo 1: Clone o Repositório
bash
Copiar código
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
Passo 2: Configuração do Ambiente
Edite os arquivos .env localizados nas pastas auth e user conforme necessário. Certifique-se de ajustar as seguintes variáveis de ambiente:

JWT_SECRET: Chave secreta usada para assinar e validar tokens JWT.
REDIS_HOST, REDIS_PORT: Configurações do Redis.
POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST, POSTGRES_PORT: Configurações do PostgreSQL.
KAFKA_BROKER: Endereço do broker Kafka.
Passo 3: Iniciar os Serviços com Docker Compose
Use o Docker Compose para levantar todos os containers (Auth Service, User Service, Kafka, Redis e PostgreSQL) de uma só vez.

bash
Copiar código
docker-compose up --build
Este comando irá:

Criar as imagens Docker para os serviços de Auth e User.
Inicializar os containers para o Kafka, Redis, e PostgreSQL.
Iniciar os microserviços e conectá-los via Docker Compose.
Passo 4: Acessando a API
Agora, você pode acessar os endpoints de autenticação e gerenciamento de usuários nos seguintes endereços:

Auth Service: http://localhost:3001
User Service: http://localhost:3002
Rotas Disponíveis
Auth Service
POST /auth/login: Faz o login de um usuário e gera um token JWT.
POST /auth/logout: Faz o logout do usuário, invalidando o token.
User Service
POST /user/create: Cria um novo usuário.
PUT /user/update/:id: Atualiza as informações de um usuário.
Scripts
Dentro de cada microserviço, você pode usar os seguintes scripts:

bash
Copiar código
# Rodar o serviço em modo de produção
npm start

# Rodar o serviço em modo de desenvolvimento (com nodemon)
npm run dev
Estrutura de Banco de Dados
O banco de dados PostgreSQL é utilizado para armazenar as seguintes informações:

Usuários: Dados como nome, email, senha (hashed) e permissões.
Sessões: Tokens e dados de sessão são armazenados no Redis para rápida recuperação.
Contribuição
Sinta-se à vontade para contribuir com este projeto! Para começar:

Faça um fork do repositório.
Crie uma branch com a sua feature: git checkout -b minha-feature.
Faça commit das suas mudanças: git commit -m 'Adicionei uma nova feature'.
Envie para o branch: git push origin minha-feature.
Abra um Pull Request.
Licença
Este projeto está licenciado sob a MIT License.

