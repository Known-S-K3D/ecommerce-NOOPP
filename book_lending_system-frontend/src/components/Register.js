import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form, Spinner, ProgressBar } from 'react-bootstrap';
import { registerUser } from '../mockUserData';
import { useNavigate } from 'react-router-dom';

// Register component - Handles the registration functionality and UI for the registration form
function Register({ toggleForm, setIsLoggedIn }) {
  // State variables to store form data, error message, loading status, success message, password strength, and password visibility
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  // useNavigate hook for programmatically navigating to different routes
  const navigate = useNavigate();

  // Updates the password field and password strength indicator
  const handlePasswordChange = (e) => {
    const newPass = e.target.value;
    setPassword(newPass);
    setPasswordStrength(checkPasswordStrength(newPass)); // Update password strength dynamically
  };

  // Function to check the strength of the password based on length, uppercase letters, numbers, and special characters
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 6) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[@$!%*?&]/.test(password)) strength += 25;
    return strength;
  };

  // Handles form submission, including validation and registration logic
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Check if passwords match before submitting
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true); // Set loading state to show a spinner on the button
    setError(''); // Clear any previous errors

    try {
      // Attempt to register the user with provided data
      await registerUser({ name, email, password });
      setIsLoggedIn(true); // Set user as logged in
      setSuccess(true); // Show success message
      
      // Clear input fields after successful registration
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Redirect to the homepage after a brief delay
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      // Set error message if registration fails
      setError(error.message);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* Title for the Register page */}
      <h1 className="text-center mt-5">Register</h1>

      {/* Card containing the registration form */}
      <Card className="mt-4 p-4 shadow-sm rounded">
        {/* Display error message if it exists */}
        {error && <Alert variant="danger" aria-live="assertive">{error}</Alert>}

        {/* Display success message upon successful registration */}
        {success && <Alert variant="success" aria-live="polite">Registration successful! Redirecting...</Alert>}

        {/* Form for handling user input and registration */}
        <Form onSubmit={handleSubmit}>
          {/* Name input field */}
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Name"
            />
          </Form.Group>

          {/* Email input field */}
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
          </Form.Group>

          {/* Password input field with strength indicator and visibility toggle */}
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password' types
              placeholder="Enter password (min. 6 characters)"
              value={password}
              onChange={handlePasswordChange}
              required
              aria-label="Password"
            />
            {/* Progress bar to show password strength */}
            <ProgressBar
              now={passwordStrength}
              label={passwordStrength === 100 ? 'Strong' : passwordStrength > 50 ? 'Medium' : 'Weak'}
              className="mt-2"
              variant={passwordStrength === 100 ? 'success' : passwordStrength > 50 ? 'warning' : 'danger'}
            />
            {/* Checkbox to toggle password visibility */}
            <Form.Check
              type="checkbox"
              label="Show Password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mt-2"
            />
          </Form.Group>

          {/* Confirm password input field with visibility toggle */}
          <Form.Group controlId="formConfirmPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={showPassword ? 'text' : 'password'} // Toggle for confirm password field
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-label="Confirm Password"
            />
          </Form.Group>

          {/* Submit button for registering */}
          <Button variant="primary" type="submit" className="mt-4 w-100" disabled={loading}>
            {/* Show spinner while loading, otherwise display 'Register' */}
            {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Register'}
          </Button>
        </Form>

        {/* Link to switch to the login form */}
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
