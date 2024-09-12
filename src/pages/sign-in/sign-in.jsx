import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { loginUser } from '../../services/authServise';
import { handleAuthErrors } from '../../utils/utils';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await loginUser(email, password);
            navigate('/');
        } catch (error) {
            setError(handleAuthErrors(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container p-5 my-5 border">
            <h2 className="text-primary mb-4">Sign In</h2>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
                <Form.Text>{error}</Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Loading...' : ' Sign In'}
            </Button>
            </Form>

            <div className='d-flex flex-column justify-content-center align-items-center'>
                <p>You don't have an account yet?</p>
                <Button className="btn-link" type="button" onClick={() => navigate('/register')}>
                    Sign Up
                </Button>
            </div>
        </div>
    )
}

export default SignIn;