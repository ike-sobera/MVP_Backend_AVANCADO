# Use a imagem base do Node.js
FROM node:14

# Crie o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos
COPY . .

# Exponha a porta da API
EXPOSE 3001

# Comando para iniciar a API
CMD ["node", "index.js"]
