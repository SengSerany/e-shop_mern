import { Container, Nav } from 'react-bootstrap';

function Footer() {
  return (
    <footer>
      <Container>
        <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
          <p className="col-md-4 mb-0 text-white">&copy; 2021 Company, Inc</p>

          <Nav className="nav col-md-5 col-sm-6 justify-content-end">
            <Nav.Link className="nav-link px-2 text-white">FAQ</Nav.Link>

            <Nav.Link className="nav-link px-2 text-white">
              Legal terms
            </Nav.Link>

            <Nav.Link className="nav-link px-2 text-white">
              Condition of use
            </Nav.Link>

            <Nav.Link className="nav-link px-2 text-white">RGPD</Nav.Link>
          </Nav>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
