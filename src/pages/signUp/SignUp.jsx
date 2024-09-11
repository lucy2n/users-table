import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { auth, db } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Создание нового пользователя
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Добавление пользователя в Realtime Database
            await set(ref(db, 'users/' + user.uid), {
                username: username,
                email: user.email,
                registration_date: new Date().toISOString(),
                last_login: new Date().toISOString(),
                status: 'active',
            });

            alert('User registered successfully');
            navigate('/login'); 
        } catch (error) {
          console.error('Error with authentication:', error.message);
        }
      };

    return (
        <div className="container p-5 my-5 border">
            <h2>Регистрация</h2>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Имя пользователя</Form.Label>
                <Form.Control type="text" placeholder="Введите имя" onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
                
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

export default SignUp;