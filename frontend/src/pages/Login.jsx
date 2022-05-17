import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, resetAuthState } from '../features/auth/authSlice';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isSuccess, isLoading, message, user } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate('/');
      toast.success('Welcome ! You are now logged !');
    }

    if (user.id !== null) {
      navigate('/');
    }

    dispatch(resetAuthState());
  }, [dispatch, isError, isSuccess, message, navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="user-form-login text-center">
      <Row>
        <Col lg={4}>
          <h1 className="h1-form-login">Login</h1>
          <p className="lead form-login">
            Connect yourself and get some fabulous pieces of art !
          </p>
        </Col>
        <Col>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
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
