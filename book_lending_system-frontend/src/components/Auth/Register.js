import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form, ProgressBar } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function Register({ setIsLoggedIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const passwordRequirements = {
    length: { regex: /.{8,}/, message: 'At least 8 characters' },
    uppercase: { regex: /[A-Z]/, message: 'At least one uppercase letter' },
    lowercase: { regex: /[a-z]/, message: 'At least one lowercase letter' },
    number: { regex: /\d/, message: 'At least one number' },
    specialChar: { regex: /[\W_]/, message: 'At least one special character' },
  };

  const calculateStrength = (strength) => {
    const metCriteria = Object.values(strength).filter(Boolean).length;
    return (metCriteria / Object.keys(passwordRequirements).length) * 100;
  };

  const handlePasswordChange = (password) => {
    setPassword(password);

    const strength = {};
    Object.entries(passwordRequirements).forEach(([key, req]) => {
      strength[key] = req.regex.test(password);
    });

    setPasswordStrength(strength);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError('');
    setError('');

    if (!validateEmail(email)) {
      setEmailError('Invalid email address.');
      return;
    }

    if (!Object.values(passwordStrength).every(Boolean)) {
      setError('Please meet all password requirements.');
      return;
    }

    try {
      const response = await fetch('http://your-api-endpoint/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setIsLoggedIn(true);
      navigate('/'); // Redirect to homepage after registration
    } catch (error) {
      setError(error.message);
    }
  };

  const strengthValue = calculateStrength(passwordStrength);
  const strengthVariant = strengthValue < 40 ? 'danger' : strengthValue < 80 ? 'warning' : 'success';

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
              isInvalid={!!emailError}
              required
            />
            <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
            />
            <ProgressBar
              now={strengthValue}
              variant={strengthVariant}
              className="mt-2"
              label={`${Math.round(strengthValue)}%`}
            />
            <div className="mt-2">
              <ul className="list-unstyled">
                {Object.entries(passwordRequirements).map(([key, req]) => (
                  <li key={key} style={{ color: passwordStrength[key] ? 'green' : 'red' }}>
                    {req.message}
                  </li>
                ))}
              </ul>
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4 w-100">
            Register
          </Button>
        </Form>
        <p className="mt-3 text-center">
          Already have an account?{' '}
          <Link to="/login">
            <Button variant="link">
              Login
            </Button>
          </Link>
        </p>
      </Card>
    </Container>
  );
}

export default Register;
