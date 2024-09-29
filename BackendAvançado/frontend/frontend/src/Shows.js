import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Shows.css';

const Shows = () => {
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [error, setError] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [distance, setDistance] = useState(null);
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const eventLocations = {
    "Tourada": { lat: -27.585155, lng: -48.486060 },
    "FFF": { lat: -27.595800, lng: -48.542500 },
    "Baile do Ike": { lat: -27.616200, lng: -48.530000 },
  };

  const fetchShows = async () => {
    try {
      const response = await axios.get('http://localhost:3003/shows');
      setShows(response.data);
    } catch (err) {
      setError('Erro ao carregar os shows: ' + err.message);
    }
  };

  const handlePurchase = async () => {
    if (!userName) {
      setErrorMessage('Por favor, insira seu nome de cadastro.');
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const addressData = response.data;
      setAddress(addressData);

      const geocodeResponse = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${addressData.logradouro}, ${addressData.bairro}, ${addressData.localidade}, ${addressData.uf}`);
      const userLocation = {
        lat: parseFloat(geocodeResponse.data[0].lat),
        lng: parseFloat(geocodeResponse.data[0].lon),
      };

      const eventLocation = eventLocations[selectedShow.name];
      const distance = calculateDistance(userLocation, eventLocation);
      setDistance(distance);

      // Registrar a compra no backend
      await registerPurchase(selectedShow.id);
      setPopupVisible(false); // Fecha o pop-up após a compra
      setErrorMessage(`Compra de ${ticketQuantity} ingresso(s) efetuada com sucesso!`);
    } catch (err) {
      setError('Erro ao buscar endereço: ' + err.message);
    }
  };

  const registerPurchase = async (showId) => {
    try {
      const response = await axios.get(`http://localhost:3003/users/search?name=${userName}`);
      const user = response.data[0];

      if (!user) {
        setErrorMessage('Usuário não encontrado. Por favor, cadastre-se.');
        return;
      }

      await axios.post('http://localhost:3003/purchases', {
        userId: user.id,
        showId: showId,
        quantity: parseInt(ticketQuantity),
      });
    } catch (err) {
      setError('Erro ao registrar compra: ' + err.message);
    }
  };

  const calculateDistance = (user, event) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Raio da Terra em km

    const dLat = toRad(event.lat - user.lat);
    const dLon = toRad(event.lng - user.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(user.lat)) * Math.cos(toRad(event.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
  };

  const closePopup = () => {
    setPopupVisible(false);
    setDistance(null);
    setErrorMessage('');
    setSelectedShow(null); // Reseta o show selecionado
  };

  const handleImageClick = (show) => {
    setSelectedShow(show);
    setPopupVisible(true); // Mostra o pop-up com informações do show
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <div className="page-container">
      <button onClick={() => navigate('/')} className="back-button">Voltar para a Home</button>
      <h1 className="title">Shows</h1>
      <input
        type="text"
        placeholder="Nome do Cadastro"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="user-input"
      />
      <div className="shows-container">
        {shows.map(show => (
          <div className="show-card" key={show.id}>
            <img 
              src={`${process.env.PUBLIC_URL}/${show.name === "Tourada" ? "TOURADA.png" : show.name === "FFF" ? "DESGOSTO.png" : "BAILEDOBRINQUINHO.png"}`} 
              alt={show.name} 
              className="show-image"
              onClick={() => handleImageClick(show)} // Abre o pop-up com informações do show
            />
            <h2>{show.name}</h2>
          </div>
        ))}
      </div>

      {popupVisible && selectedShow && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedShow.name}</h2>
            <p>Venue: {selectedShow.venue}</p>
            <p>Date: {new Date(selectedShow.date).toLocaleDateString('pt-BR')}</p>
            <p>Price: R$ {selectedShow.price}</p>
            <input
              type="number"
              min="1"
              value={ticketQuantity}
              onChange={(e) => setTicketQuantity(e.target.value)}
              className="ticket-quantity"
            />
            <input
              type="text"
              placeholder="Digite seu CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              className="cep-input"
            />
            <button onClick={handlePurchase}>Comprar Ingresso</button>
            <button onClick={closePopup}>Fechar</button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{errorMessage}</h2>
            {address && (
              <p>Endereço: {address.logradouro}, {address.bairro}, {address.localidade} - {address.uf}</p>
            )}
            {distance !== null && (
              <p>Distância até o evento: {distance.toFixed(2)} km</p>
            )}
            <button onClick={closePopup}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shows;
