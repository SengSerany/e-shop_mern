import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaCartArrowDown,
} from 'react-icons/fa';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getIndexProducts,
  resetProductState,
} from '../features/product/productSlice';
import {
  handleSession,
  logout,
  resetAuthState,
} from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isSuccess, isError, isUnlogged, message } = useSelector(
    (state) => state.auth
  );
  const { productSuccess, productError, productMessage } = useSelector(
    (state) => state.product
  );

  const handleLogout = (e) => {
    dispatch(logout());
    dispatch(resetAuthState());
  };

  useEffect(() => {
    if (user.id === null && !isUnlogged) {
      dispatch(handleSession('profile'));
    }

    if (isUnlogged) {
      navigate('/');
      toast.success(message);
    }

    if (isError || productError) {
      if (message !== '') {
        toast.error(message);
      } else if (productMessage !== '') {
        toast.error(productMessage);
      }
    }

    if (isSuccess || productSuccess) {
      if (location.pathname === '/login') {
        navigate('/');
      } else if (location.pathname === '/register') {
        navigate('/login');
      }
    }

    if (message !== '' && isSuccess) {
      toast.success(message);
    } else if (productMessage !== '') {
      toast.success(productMessage);
    }

    if (user.id !== null && location.pathname === '/login') {
      navigate('/');
    }

    if (user.id !== null && location.pathname === '/register') {
      navigate('/');
    }

    if (isError || isSuccess || isUnlogged || message !== '') {
      dispatch(resetAuthState());
    }

    if (productError || productSuccess) {
      dispatch(resetProductState());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, isUnlogged, productSuccess, productError]);

  useEffect(() => {
    dispatch(getIndexProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header>
      <br />
      <Navbar>
        <Container>
          <Nav className="mx-auto">
            <Row>
              <Col>
                <Link className="nav-link" eventkey="link-1" to="/store">
                  Store
                </Link>
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
                <Link to="/cart">
                  <FaCartArrowDown />
                </Link>
              </Nav.Item>
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
