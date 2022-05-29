import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyCart } from '../features/cart/cartSlice';
import { Row, Col, Spinner, Button } from 'react-bootstrap';
import ProductsCardInCart from '../components/ProductCardInCart';

function Cart() {
  const { productsInCart, cartLoading } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  function priceWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  const calcTotalPrice = () => {
    let calcPrice = 0;
    productsInCart.map((linkProductCart) => {
      const infosProduct = products.find(
        (product) => product._id === linkProductCart.product
      );
      return (calcPrice += infosProduct.price);
    });

    const calcRoundPrice = Math.round((calcPrice + Number.EPSILON) * 100) / 100;
    return calcRoundPrice;
  };

  if (cartLoading) {
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
    </Row>;
  }

  const calcVATPrice = () => {
    const calcVAT = (calcTotalPrice() * 5.5) / 100;
    const calcRoundVAT = Math.round((calcVAT + Number.EPSILON) * 100) / 100;
    return calcRoundVAT;
  };

  const [totalPrice, setTotalPrice] = useState(0);

  const [totalVAT, setTotalVAT] = useState(0);

  useEffect(() => {
    if (productsInCart === []) {
      dispatch(getMyCart());
    }
    setTotalPrice(priceWithSpaces(calcTotalPrice()));
    setTotalVAT(priceWithSpaces(calcVATPrice()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsInCart]);

  if (productsInCart.length < 1) {
    return (
      <div>
        <h1 className="h1 text-center">My cart</h1>
        <br />
        <Row className="justify-content-center">
          <Col md="auto">
            <p className="text-center p-empty-cart">
              You cart is empty! <br />
              Go to the store to select the art pieces you likes !
            </p>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div>
      <h1 className="h1 text-center">My cart</h1>
      <br />
      <Row className="justify-content-center">
        <Col md={10}>
          <br />
          <h3>Resume:</h3>
          <br />
          {productsInCart.map((productSelected) => {
            const productElement = products.find(
              (product) => product._id === productSelected.product
            );
            return (
              <ProductsCardInCart
                key={`cart-${productElement._id}`}
                product={productElement}
                linkID={productSelected._id}
              />
            );
          })}
          <br />
          <Row className="justify-content-end">
            <Col sm="auto">Total with VAT: </Col>
            <Col sm="auto total-price">
              <strong>{totalPrice} €</strong>
            </Col>
          </Row>
          <Row className="justify-content-end">
            <Col sm="auto">Total of VAT: </Col>
            <Col sm="auto total-price">
              <strong>{totalVAT} €</strong>
            </Col>
          </Row>
          <Row className="justify-content-end">
            <Col sm="auto">
              <br />
              <Link to="/orders/new">
                <Button variant="success">Command</Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
