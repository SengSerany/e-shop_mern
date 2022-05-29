import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addInCart } from '../features/cart/cartSlice';
import { Row, Col, Button } from 'react-bootstrap';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ProductShow() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);
  const { cart, productsInCart } = useSelector((state) => state.cart);

  const currentProduct = products.find((product) => product._id === params.id);

  const priceWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };
  const handleAddCart = () => {
    if (user.id === null) {
      navigate('/login');
      return toast.error('You must be logged for buying this');
    }

    const linkObj = { cart: cart, product: currentProduct._id };

    const isProdSelected = productsInCart.find(
      (selectProd) =>
        selectProd.cart === cart && selectProd.product === currentProduct._id
    );

    if (isProdSelected) {
      return toast.error('This product already on your cart');
    }

    dispatch(addInCart(linkObj));
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="auto">
          <img
            src={currentProduct.image}
            alt={currentProduct.title}
            className="img-show-product"
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Row>
            <Col>
              <h1 className="h1-show-product">
                {currentProduct.title}{' '}
                <em className="h1-em-author">by {currentProduct.author}</em>
              </h1>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={4}>
              <h5>{currentProduct.medium}</h5>
            </Col>
            <Col md={{ span: 4, offset: 4 }} className="text-on-right">
              <h6>{`Format : ${currentProduct.format[0]} x ${currentProduct.format[1]} x ${currentProduct.format[2]} mm`}</h6>
            </Col>
          </Row>
          <p>{currentProduct.description}</p>
          <Row>
            <Col md={4}>
              <p>
                Price: <strong>{priceWithSpaces(currentProduct.price)}€</strong>
              </p>
            </Col>
            <Col className="text-on-right" md={{ span: 4, offset: 4 }}>
              <Button variant="success" size="sm" onClick={handleAddCart}>
                <FaPlus /> Add to cart
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Button variant="outline-dark" size="sm" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </Button>
    </div>
  );
}

export default ProductShow;
