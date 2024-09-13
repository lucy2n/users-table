import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { registerUser } from '../../services/auth-servise';
import { handlRegisterErrors } from '../../utils/utils';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, username);
      navigate('/login');
    } catch (error) {
      setError(handlRegisterErrors(error));
    }
  };

  return (
    <div className="container p-5 my-5 border w-50">
      <h2 className="text-primary mb-4">Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter your name" 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter your email" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Form.Text className="text-danger">
            {error && <span>{error}</span>}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter your password" 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Group>

        <button id="register-button" type="submit">
          Submit
        </button>
      </Form>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <p>Already have an account?</p>
        <Button className="btn-link" type="button" onClick={() => navigate('/login')}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default SignUp;