import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { loginUser } from '../mockUserData';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

// Login component - Handles the login functionality and UI for the login form
function Login({ toggleForm, setIsLoggedIn }) {
  // State variables to store email, password, error message, loading status, show password toggle, and remember me option
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Handles form submission, including form validation and login logic
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to show a spinner on the button
    setError(''); // Clear any previous errors

    try {
      // Attempt to log in the user with provided email and password
      const user = await loginUser(email, password);
      
      // If "Remember Me" is checked, store token in local storage
      if (rememberMe) {
        localStorage.setItem('token', 'your_token');
      }

      // Set user as logged in and navigate to the homepage
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      // Set error message if login fails
      setError(error.message);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  // Validates the email format using a regular expression
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Handles changes to the email input and clears error messages on input
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(''); // Clear error message on new input
  };

  // Handles changes to the password input and clears error messages on input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError(''); // Clear error message on new input
  };

  return (
    <Container>
      {/* Title for the Login page */}
      <h1 className="text-center mt-5">Login</h1>

      {/* Card containing the login form */}
      <Card className="mt-4 p-4 shadow-sm rounded">
        {/* Display error message if it exists */}
        {error && <Alert variant="danger" aria-live="assertive">{error}</Alert>}

        {/* Form for handling user input and login */}
        <Form onSubmit={handleSubmit} noValidate>
          {/* Email input field with validation */}
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              isInvalid={!validateEmail(email) && email !== ''}
              required
              aria-label="Email"
            />
            {/* Inline feedback if the email is invalid */}
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password input field with optional "show password" checkbox */}
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              required
              aria-label="Password"
            />
            {/* Checkbox for toggling password visibility */}
            <Form.Check
              type="checkbox"
              label="Show Password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mt-2"
            />
          </Form.Group>

          {/* Remember Me checkbox */}
          <Form.Group controlId="formRememberMe" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Remember Me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
          </Form.Group>

          {/* Submit button for logging in */}
          <Button
            variant="primary"
            type="submit"
            className="mt-4 w-100"
            disabled={loading || !validateEmail(email) || password === ''}
          >
            {/* Show spinner while loading, otherwise display 'Login' */}
            {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Login'}
          </Button>
        </Form>

        {/* Link to switch to the registration form */}
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
