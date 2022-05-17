import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, resetAuthState } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isUnlogged } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAuthState());
  };

  useEffect(() => {
    if (isUnlogged) {
      navigate('/');
      toast.success('Your are unlogged !');
    }

    dispatch(resetAuthState());
  }, [dispatch, isUnlogged, navigate]);

  return (
    <header>
      <br />
      <Navbar>
        <Container>
          <Nav className="mx-auto">
            <Row>
              <Col>
                <Nav.Link eventkey="link-1">Store</Nav.Link>
              </Col>
              <Col>
                <Nav.Link eventkey="link-2">Exhibitions</Nav.Link>
              </Col>
              <Col>
                <Link className="nav-link" to="/">
                  GALLERY
                </Link>
              </Col>
              <Col>
                <Nav.Link eventkey="link-3">About</Nav.Link>
              </Col>
              <Col>
                <Nav.Link eventkey="link-4">Contact</Nav.Link>
              </Col>
            </Row>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <br />
        <Nav className="justify-content-end" activeKey="/home">
          {user.id !== null ? (
            <>
              <Nav.Item>
                <Link to="/profile">
                  <FaUser /> {user.username}
                </Link>
              </Nav.Item>
              <Nav.Item>
                <button className="btn-logout" onClick={handleLogout}>
                  <FaSignOutAlt /> Log out
                </button>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Link to="/login" eventkey="link-login">
                  <FaSignInAlt /> Login
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/register" eventkey="link-register">
                  <FaUser /> Register
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Container>
    </header>
  );
}

export default Header;
