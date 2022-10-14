# Aplicação frontend

Esse projeto foi construído usando CRA [Create React App](https://github.com/facebook/create-react-app) e [Material-UI](https://mui.com/).

# Ferramentas utilizadas
### NodeJS version
#### `v16.17.0`
### Ubuntu
#### `v22.04`

## Rodando a aplicação
## Em ambiente de desenvolvimento

> Antes de acessar a página do front, certifique-se que o backend esteja rodando na porta 8000 antes.

Pra rodar o front, rode o seguinte comando no terminal:

```
npm start
```

Abra [http://localhost:3000](http://localhost:3000) pra visualizar a página inicial.

## Em ambiente de produção

Pra buildar o React rode o comando abaixo:

```
npm run build
```

Pra executar o build da aplicação, primeiro instale o pacote `serve` globalmente pra criar um servidor local pra servir os arquivos buildados:

```
npm install -g serve
```

Em seguida execute:

```
serve -s build
```

Abra [http://localhost:3000](http://localhost:3000) pra visualizar a página inicial, porém mais leve e com os assets empacotados e minificados.
