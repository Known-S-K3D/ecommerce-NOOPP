import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUser  } from 'react-icons/fa';
import Login from './components/Login';
import Register from './components/Register';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import ViewProducts from './components/ViewProducts';
import ViewCart from './components/ViewCart'; // Add ViewCart component
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [isLoginForm, setIsLoginForm] = useState(true); // Track which form is shown
  const [cartCount, setCartCount] = useState(0); // Track cart count

  const toggleForm = (isLogin) => {
    setIsLoginForm(isLogin);
  };

  const addToCart = () => {
    setCartCount(cartCount + 1); // Increment cart count
  };

  return (
    <Router>
      <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">Product Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {isLoggedIn && <Nav.Link as={Link} to="/add">Add Product</Nav.Link>}
              {isLoggedIn && (
                <Nav.Link as={Link} to="/cart">
                  Cart <span className="badge badge-pill badge-primary">{cartCount}</span>
                </Nav.Link>
              )}
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/login">
                <FaUser  /> {isLoggedIn ? 'Logout' : 'Login'}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ViewProducts addToCart={addToCart} />} />
          <Route path="/add" element={isLoggedIn ? <AddProduct /> : <Login toggleForm={toggleForm} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/edit/:id" element={isLoggedIn ? <EditProduct /> : <Login toggleForm={toggleForm} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={isLoginForm ? <Login toggleForm={toggleForm} setIsLoggedIn={setIsLoggedIn} /> : <Register toggleForm={toggleForm} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/cart" element={<ViewCart />} /> {/* New cart route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;