import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spinner, Button } from 'react-bootstrap';
import ProductsCardInCart from '../components/ProductCardInCart';
import { getMyCart } from '../features/cart/cartSlice';

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
      return (calcPrice += linkProductCart.quantity * infosProduct.price);
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

  const [totalPrice, setTotalPrice] = useState(
    priceWithSpaces(calcTotalPrice())
  );

  const [totalVAT, setTotalVAT] = useState(priceWithSpaces(calcVATPrice()));

  useEffect(() => {
    if (productsInCart === []) {
      dispatch(getMyCart());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                quantity={productSelected.quantity}
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
          <Row className="justify-content-center">
            <Col sm="auto">
              <br />
              <Button variant="success">Command</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
