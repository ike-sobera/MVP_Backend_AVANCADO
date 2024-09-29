# Projeto Shows - Backend

Este projeto é uma aplicação para gerenciar shows do artista Ike Sobera (projeto secundário e hobbie do autor deste projeto), onde os usuários podem buscar informações sobre shows, comprar ingressos e gerenciar seus dados.

## Requisitos

Antes de começar, verifique se você possui as seguintes ferramentas instaladas:

- **Node.js**: [Download aqui](https://nodejs.org/)
- **NPM**: O gerenciador de pacotes vem instalado junto com o Node.js.
- **Docker**: [Download aqui](https://www.docker.com/products/docker-desktop)
- **Ambientes Virtuais** (opcional): Para gerenciar suas dependências de forma isolada.

## Instalação


Será necessário ter todas as libs python listadas no `requirements.txt` instaladas.
Após clonar o repositório, é necessário ir ao diretório raiz, pelo terminal, para poder executar os comandos descritos abaixo.

> É fortemente indicado o uso de ambientes virtuais do tipo [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html).

```
(env)$ pip install -r requirements.txt
```

Este comando instala as dependências/bibliotecas, descritas no arquivo `requirements.txt`.

Instale as dependências com
```
npm install
```



### Iniciando o Projeto

```
cd api-shows
node index.js
```


## Como executar através do Docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile e o requirements.txt no terminal.
Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
cd api-shows
docker build -t api-shows .
```
### Agora crie os containers Docker

```
docker run -d -p 3001:3001 api-shows
```

Uma vez executando, para acessar a API, basta abrir o http://localhost:3001 no navegador.