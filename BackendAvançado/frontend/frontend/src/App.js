import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import UserSearch from './UserSearch';
import Shows from './Shows';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/search" element={<UserSearch />} />
                <Route path="/shows" element={<Shows />} />
            </Routes>
        </Router>
    );
}

export default App;
