import { Button, Form } from 'react-bootstrap';

function RegistrationForm() {
  return (
    <Form>
     <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Имя пользователя</Form.Label>
        <Form.Control type="text" placeholder="Введите имя" />
      </Form.Group>
        
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Введите адрес вашей почты" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Сохранить
      </Button>
    </Form>
  );
}

export default RegistrationForm;