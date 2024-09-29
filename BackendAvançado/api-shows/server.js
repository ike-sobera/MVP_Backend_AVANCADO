const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { User, Show, Purchase, syncDatabase } = require('./models');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Sincronizar o banco de dados
syncDatabase()
    .then(() => {
        console.log('Database synced!');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

// Endpoint para criar um usuário
app.post('/users', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const user = await User.create({ name, email, age });
        res.status(201).json(user);
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(400).json({ error: error.errors.map(err => err.message) });
    }
});

// Endpoint para obter os shows
app.get('/shows', async (req, res) => {
    try {
        const shows = await Show.findAll();
        console.log('Shows retornados:', shows); // Log para depuração
        res.json(shows);
    } catch (error) {
        console.error('Erro ao carregar os shows:', error);
        res.status(500).json({ error: 'Erro ao carregar os shows' });
    }
});

// Endpoint para registrar uma compra
app.post('/purchases', async (req, res) => {
    const { userName, showId, quantity } = req.body;

    try {
        const user = await User.findOne({ where: { name: userName } });

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        const purchase = await Purchase.create({
            userId: user.id,
            showId,
            quantity,
        });
        res.status(201).json(purchase);
    } catch (error) {
        console.error('Erro ao registrar compra:', error);
        res.status(400).json({ error: 'Erro ao registrar compra: ' + error.message });
    }
});

// Endpoint para buscar um usuário pelo nome
app.get('/users/search', async (req, res) => {
    const { name } = req.query;

    try {
        const user = await User.findOne({ where: { name } });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});

// Endpoint para deletar um usuário
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  console.log(`Recebendo pedido de deleção para o usuário ID: ${id}`); // Log para verificar a requisição

  try {
      const user = await User.findByPk(id);
      if (!user) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      await user.destroy();
      res.status(204).send(); // Retorna 204 No Content
  } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});


// Iniciar o servidor
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
