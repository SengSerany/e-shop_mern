import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CarouselElement({ products }) {
  return (
    <Carousel>
      {products.map((product) => {
        return (
          <Carousel.Item key={product._id}>
            <img
              className="d-block img-carousel"
              src={product.image}
              alt={`${product.title}-slide`}
            />
            <Carousel.Caption>
              <h3>{product.title}</h3>
              <p>{product.description.substring(0, 200)}...</p>
              <Link
                className="btn btn-dark"
                to={'/store/products/' + product._id}
              >
                Learn more
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default CarouselElement;
