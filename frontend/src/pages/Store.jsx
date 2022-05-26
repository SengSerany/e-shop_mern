import { useSelector } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import ProductsCard from '../components/ProductsCard.js';
import CarouselElement from '../components/CarouselElement.js';

function Store() {
  const { products, productLoading } = useSelector((state) => state.product);
  if (productLoading) {
    return (
      <Row className="justify-content-center">
        <Col md="auto">
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        </Col>
      </Row>
    );
  }

  const lastsProds = products.slice(0, 3);

  return (
    <>
      <div>
        <h1 className="h1 text-center">Store</h1>

        <CarouselElement products={lastsProds} />
        <br />
        <Row className="justify-content-center">
          <Col md="auto">
            <br />
            <h2>All art pieces</h2>
            <br />
          </Col>
        </Row>
        <Row className="justify-content-center">
          {products.length > 0 &&
            products.map((product) => (
              <ProductsCard key={`card-${product._id}`} product={product} />
            ))}
        </Row>
      </div>
    </>
  );
}

export default Store;
