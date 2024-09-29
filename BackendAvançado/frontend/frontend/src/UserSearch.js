import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSearch = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3003/users/search`, {
        params: { name }
      });
      setUsers([response.data]);
      setError(null);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setError('Erro ao buscar usuários. Tente novamente.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/users/${id}`);
      setUsers(users.filter(user => user.id !== id)); // Remove o usuário da lista
      setError(null);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      setError('Erro ao deletar usuário. Tente novamente.');
    }
  };

  return (
    <div>
      <h1>Buscar Usuário</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Nome do Usuário"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Buscar</button>
      </form>

      <h2>Resultados da Busca</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <p>Nome: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Idade: {user.age}</p>
              <button onClick={() => handleDelete(user.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}

      <button onClick={() => navigate('/')} style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}>
        Voltar para a Home
      </button>
    </div>
  );
};

export default UserSearch;
