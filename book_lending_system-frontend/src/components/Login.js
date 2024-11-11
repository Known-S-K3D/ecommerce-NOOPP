// src/components/Login.js
import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { loginUser } from '../mockUserData'; // Mock user data
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function Login({ toggleForm, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const user = loginUser(email, password);
      localStorage.setItem('token', 'your_token');
      setIsLoggedIn(true);
      navigate('/'); // Redirect to homepage after login
    } catch (error) {
      setError(error.message); // Show error message if login fails
    }
  };

  return (
    <Container>
      <h1 className="text-center mt-5">Login</h1>
      <Card className="mt-4 p-4 shadow-sm">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4 w-100">
            Login
          </Button>
        </Form>
        <p className="mt-3 text-center">
          Don't have an account?{' '}
          <Button variant="link" onClick={() => toggleForm(false)}>
            Register
          </Button>
        </p>
      </Card>
    </Container>
  );
}

export default Login;
