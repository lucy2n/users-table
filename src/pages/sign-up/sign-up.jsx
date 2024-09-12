import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { registerUser } from '../../services/auth-servise';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(email, password, username);
            alert('User registered successfully');
            navigate('/login');
        } catch (error) {
            console.error('Error with authentication:', error.message);
        }
    };

    return (
        <div className="container p-5 my-5 border w-50">
            <h2 className="text-primary mb-4">Sign Up</h2>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
                
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            </Form>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <p>Already have an account?</p>
                <Button className="btn-link" type="button" onClick={() => navigate('/login')}>
                    Sing In
                </Button>
            </div>
        </div>
    )
}

export default SignUp;