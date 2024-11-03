import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={isLoggedIn ? <Navigate to="/products" /> : <Login onLogin={handleLogin} />} />
                    <Route path="/products" element={isLoggedIn ? <ProductList /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
