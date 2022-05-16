import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="user-form text-center">
      <Row>
        <Col lg={4}>
          <h1 className="h1-form-login">Login</h1>
          <p className="lead form-login">
            Connect yourself and get some fabulous pieces of art !
          </p>
        </Col>
        <Col>
          <br />
          <Form>
            <Form.Group
              className="mb-3"
              controlId="email"
              onSubmit={handleSubmit}
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Validate
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
