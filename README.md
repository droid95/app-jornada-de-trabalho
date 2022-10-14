# Rodando a aplicação
Há duas formas de rodar a aplicação

## Opção 1) Rodando o frontend e backend manualmente no terminal

Clone o repositório
```
git clone https://github.com/droid95/app-jornada-de-trabalho.git
```

Vá até a pasta onde se encontra a raiz do projeto
```
cd app-jornada-de-trabalho
```

### Backend

Vá até a pasta `backend` e rode os seguintes comandos

Instale as dependências da aplicação
```
cd backend
npm install
```

Ainda dentro da pasta `backend` rode o servidor pra escutar na porta `8000` (porta padrão no arquivo `.env`)
```
npm start
```

Esse backend foi construído usando `NodeJS` na versão `v16.17.0`

> Mantive o .env no source apenas pra não adicionar mais etapas pra rodar a aplicação

### Frontend

Agora abra outro terminal e vai até a pasta `frontend` e rode os seguintes comandos

Instale as dependências da aplicação
```
cd frontend
npm install
```

Ainda dentro da pasta `frontend` rode o comando abaixo pro React iniciar
**Certifique-se de rodar o backend primeiro**
```
npm start
```

Agora acesse [http://localhost:3000](http://localhost:3000) pra visualizar a página.

Esse front foi construído usando `NodeJS` na versão `v16.17.0`

## Opção 2) Rodando o frontend e backend em containers com Docker Compose

Certifique-se de ter instalado em sua máquina o `Docker`na versão `20.10.18` e `Docker Compose` na versão `v2.10.2`

> Certifique-se de estar na raiz do folder

```
docker compose up -d --build
```

Acesse [http://localhost:3000](http://localhost:3000) pra visualizar a página.
