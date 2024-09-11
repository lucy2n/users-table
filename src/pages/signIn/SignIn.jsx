import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { auth, db } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, update } from 'firebase/database';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await update(ref(db, 'users/' + user.uid), {
            last_login: new Date().toISOString(),
            status: 'active',
          });  

        alert('User signed in successfully');
        navigate('/'); 

        } catch (error) {
          console.error('Error with authentication:', error.message);
        }
      };

    return (
        <div className="container p-5 my-5 border">
            <h2>Вход</h2>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Введите адрес вашей почты" onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Введите пароль" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Сохранить
            </Button>
            </Form>
        </div>
    )
}

export default SignIn;