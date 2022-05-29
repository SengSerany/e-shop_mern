import { Carousel } from 'react-bootstrap';

function CarouselStore({ products }) {
  return (
    <Carousel className="carousel-store">
      {products.map((product) => {
        return (
          <Carousel.Item key={product._id}>
            <img
              className="img-carousel-store"
              src={product.image}
              alt={product.title}
            />
            <Carousel.Caption>
              <h3>{product.title}</h3>
              <h3>{product.author}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default CarouselStore;
