<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Card, Row, Col, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Pages/AdminDashboard';
import Store from './components/Pages/Store';
import EditProduct from './components/Admin/EditProduct';
import Cart from './components/Cart/Cart';
=======
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
>>>>>>> 4e0ec056ca0ca0c1bac375f8f83dc65eb6a18e2d
import 'bootstrap/dist/css/bootstrap.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleBuyClick = (product) => {
    console.log('Redirecting to store with product:', product); // Debug log
    navigate('/store', { state: { product } }); // Pass product data to Store via state
  };

  const addToCart = () => {
    setCartCount(cartCount + 1); // Increment cart count
  };

  return (
    <Container>
      <h2 className="text-center my-4">Product List</h2>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col md={4} className="mb-4" key={product.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{product.description}</Card.Title>
                  <Card.Text>
                    Price: ${product.price}
                    <br />
                    Quantity: {product.quantity}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleBuyClick(product)}>
                    Buy
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cart/count');
        setCartCount(response.data.count);
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };
    fetchCartCount();
  }, []);

  return (
    <Router>
      <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">Product Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {isLoggedIn && <Nav.Link as={Link} to="/admin/dashboard">Admin Dashboard</Nav.Link>}
              {isLoggedIn && (
                <Nav.Link as={Link} to="/cart">
                  Cart ({cartCount})
                </Nav.Link>
              )}
            </Nav>
            <Nav className="ml-auto">
<<<<<<< HEAD
              <Nav.Link as={Link} to="/login" onClick={() => setIsLoggedIn(false)}>
                {isLoggedIn ? 'Logout' : 'Login'}
=======
              <Nav.Link as={Link} to="/login">
                <FaUser  /> {isLoggedIn ? 'Logout' : 'Login'}
>>>>>>> 4e0ec056ca0ca0c1bac375f8f83dc65eb6a18e2d
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-4">
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/edit/:id" element={<EditProduct />} />
=======
          <Route path="/" element={<ViewProducts addToCart={addToCart} />} />
          <Route path="/add" element={isLoggedIn ? <AddProduct /> : <Login toggleForm={toggleForm} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/edit/:id" element={isLoggedIn ? <EditProduct /> : <Login toggleForm={toggleForm} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={isLoginForm ? <Login toggleForm={toggleForm} setIsLoggedIn={setIsLoggedIn} /> : <Register toggleForm={toggleForm} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/cart" element={<ViewCart />} /> {/* New cart route */}
>>>>>>> 4e0ec056ca0ca0c1bac375f8f83dc65eb6a18e2d
        </Routes>
      </div>
    </Router>
  );
}

export default App;