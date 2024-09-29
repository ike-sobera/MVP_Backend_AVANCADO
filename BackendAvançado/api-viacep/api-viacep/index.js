const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// Endpoint para obter informações de um CEP
app.get('/cep', async (req, res) => {
    const { cep } = req.query;

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (response.data.erro) {
            return res.status(404).json({ error: 'CEP não encontrado' });
        }

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`API do ViaCEP rodando em http://localhost:${port}`);
});
