import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3003/users', {
                name,
                email,
                age: parseInt(age, 10),
            });
            alert('Cadastro realizado com sucesso!');
            setName('');
            setEmail('');
            setAge('');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="page-container">
            <button onClick={() => navigate('/')} className="back-button">Voltar para a Home</button>
            <h1 className="title">Cadastre-se</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="user-input"
                    required
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="user-input"
                    required
                />
                <input
                    type="number"
                    placeholder="Idade"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="user-input"
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default SignUp;
