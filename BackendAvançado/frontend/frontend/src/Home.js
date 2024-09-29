import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Importe o CSS para o Home

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src="/TELÃO 2024.2_1.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>
      <div className="content">
        <h1>Shows do Ike</h1>
        <button onClick={() => navigate('/shows')} className="button">Acessar Shows</button>
        <button onClick={() => navigate('/signup')} className="button">Cadastrar Usuário</button>
        <button onClick={() => navigate('/search')} className="button">Buscar Usuário</button>
      </div>
    </div>
  );
};

export default Home;
