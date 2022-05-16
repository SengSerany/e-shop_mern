import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const { user } = useSelector((state) => state.auth);

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
          {user ? (
            <>
              <Nav.Item>
                <Link to="/profile">
                  <FaUser /> {user.username}
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/">
                  <FaSignOutAlt /> Log out
                </Link>
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
