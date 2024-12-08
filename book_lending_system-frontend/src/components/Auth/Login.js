// src/components/Auth/Login.js
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer'); // Default to 'customer'
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock login logic (you would replace this with an actual API call)
    if (username && password) {
      setIsLoggedIn(true);
      // Redirect based on the selected userType
      if (userType === 'admin') {
        navigate('/admin/dashboard'); // Admin dashboard page
      } else {
        navigate('/store'); // Store page for customers
      }
    } else {
      alert('Please enter your credentials');
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formUserType">
        <Form.Label>Select User Type</Form.Label>
        <Form.Check
          type="radio"
          label="Admin"
          value="admin"
          checked={userType === 'admin'}
          onChange={() => setUserType('admin')}
        />
        <Form.Check
          type="radio"
          label="Customer"
          value="customer"
          checked={userType === 'customer'}
          onChange={() => setUserType('customer')}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>

      <div className="mt-3">
        <span>Don't have an account?</span>
        <Link to="/register" style={{ marginLeft: '5px' }}>
          <Button variant="link">Register</Button>
        </Link>
      </div>
    </Form>
  );
};

export default Login;
