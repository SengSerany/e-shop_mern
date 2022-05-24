import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

function ProductsCardInCart({ product, quantity }) {
  function priceWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  return (
    <Col>
      <Link to={`/store/products/${product._id}`} className="link-cart">
        <Card className="rounded-3">
          <Row>
            <Col md={6}>
              <div className="img-cart">
                <Card.Img variant="top" src={product.image} />
              </div>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Card.Title>{product.title}</Card.Title>
                </Col>
                <Col>
                  <Card.Text className="p-cart text-on-right">
                    <strong>{`${priceWithSpaces(product.price)}€`}</strong>
                  </Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Title>
                    <em className="em-author-cart">{`${product.author}`}</em>
                  </Card.Title>
                </Col>
                <Col>
                  <Card.Text className="p-cart text-on-right">
                    x{quantity}
                  </Card.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Link>
    </Col>
  );
}

export default ProductsCardInCart;
