const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { User, Show, syncDatabase } = require('./models'); // Remover Purchase

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Sincronizar o banco de dados
syncDatabase().then(() => {
    console.log('Database synced!');
}).catch(err => {
    console.error('Error syncing database:', err);
});

// Shows fixos para o exemplo
const shows = [
    { id: 1, name: "Tourada", venue: "Life Club", date: "2024-10-05", price: 85, address: "SC-401, 14525 - Vargem Pequena, Florianópolis - SC, 88050-000" },
    { id: 2, name: "FFF", venue: "Desgosto Bar", date: "2023-10-12", price: 65, address: "Rua Padre Roma, 174 - Centro, Florianópolis - SC, 88010-090" },
    { id: 3, name: "Baile do Ike", venue: "NoClass", date: "2023-10-19", price: 30, address: "R. Victor Meirelles, 184 - Centro, Florianópolis - SC, 88010-440" }
];

// Endpoint para obter os shows
app.get('/shows', async (req, res) => {
    try {
        const showsFromDB = await Show.findAll(); // Busca os shows no banco de dados
        res.json(showsFromDB);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao carregar os shows' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
