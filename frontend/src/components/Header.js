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
import { getMyCart, resetCartState } from '../features/cart/cartSlice';
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
  const { productsInCart, cartSuccess, cartError, cartMessage } = useSelector(
    (state) => state.cart
  );

  const qtyProdSelected = () => {
    if (productsInCart && productsInCart.length > 0) {
      let counter = productsInCart.length;
      return counter;
    }
  };

  const handleLogout = (e) => {
    dispatch(logout());
    dispatch(resetAuthState());
  };

  useEffect(() => {
    if (isUnlogged) {
      navigate('/');
      toast.success(message);
    }

    if (isError || productError || cartError) {
      if (message !== '') {
        toast.error(message);
      } else if (productMessage !== '') {
        toast.error(productMessage);
      } else if (cartError !== '') {
        toast.error(cartMessage);
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
    }

    if (productMessage !== '' && productSuccess) {
      toast.success(productMessage);
    }

    if (cartMessage !== '' && cartSuccess) {
      toast.success(cartMessage);
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

    if (cartSuccess || cartError) {
      dispatch(resetCartState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isError,
    isSuccess,
    isUnlogged,
    productSuccess,
    productError,
    cartSuccess,
    cartError,
    message,
    productMessage,
    cartMessage,
  ]);

  useEffect(() => {
    if (user.id !== null) {
      dispatch(getMyCart());
    }
    dispatch(getIndexProducts());
    dispatch(handleSession('profile'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

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
                  <em className="">{qtyProdSelected()}</em>
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
      <br />
    </header>
  );
}

export default Header;
