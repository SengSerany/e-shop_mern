import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

function ProductsCard({ product }) {
  function priceWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  return (
    <Col md="auto">
      <Link to={`/store/products/${product._id}`}>
        <Card className="index-product-image rounded-3">
          <div className="index-product-image">
            <Card.Img variant="top" src={product.image} />
          </div>
          <Card.Body>
            <Row className="justify-content-between">
              <Col md="auto">
                <Card.Title>{product.title}</Card.Title>
                <em className="em-card-author">{`by ${product.author}`}</em>
              </Col>
              <Col md="auto">
                <p>
                  <strong>{priceWithSpaces(product.price)} €</strong>
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default ProductsCard;
