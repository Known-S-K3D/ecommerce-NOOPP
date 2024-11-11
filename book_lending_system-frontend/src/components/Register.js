// src/components/Register.js
import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { registerUser } from '../mockUserData'; // Mock user data
import { useNavigate } from 'react-router-dom';

function Register({ toggleForm, setIsLoggedIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      registerUser({ name, email, password });
      setIsLoggedIn(true);
      navigate('/'); // Redirect to homepage after registration
    } catch (error) {
      setError(error.message); // Show error message if registration fails
    }
  };

  return (
    <Container>
      <h1 className="text-center mt-5">Register</h1>
      <Card className="mt-4 p-4 shadow-sm">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
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
            Register
          </Button>
        </Form>
        <p className="mt-3 text-center">
          Already have an account?{' '}
          <Button variant="link" onClick={() => toggleForm(true)}>
            Login
          </Button>
        </p>
      </Card>
    </Container>
  );
}

export default Register;
