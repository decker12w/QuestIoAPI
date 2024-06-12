# App-backend-Node.js

Aplicação back-end para a plataforma QuestIO utilizando Node.js com Fastify

---

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Rodar o Projeto](#rodar-o-projeto)
- [Testes](#testes)
- [Build do Projeto](#build-do-projeto)

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina.

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- npm (geralmente incluído com o Node.js)

## Instalação

```bash
git clone https://github.com/QuestIO42/App-backend-Node.js.git
cd App-backend-Node
npm i
```

## Rodar o projeto

- Para rodar o projeto em modo de desenvolvimento

  - Primeiro inicialize os containers do docker

  ```bash
  docker compose up -d
  ```

  - Segundo realize as migrações para o banco de dados

  ```bash
  npm run migrations
  ```

  - Terceiro inicie o servidor de desenvolvimento

  ```bash
  npm run start:dev
  ```

## Testes

- Para rodar os testes da aplicação
  - Testes unitários
  ```bash
    npm run test
  ```
  - Testes e2e
  ```bash
    npm run test:e2e
  ```
  - Todos os testes
  ```bash
    npm run test:all
  ```
