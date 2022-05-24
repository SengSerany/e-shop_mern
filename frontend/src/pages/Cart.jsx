import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyCart } from '../features/cart/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getMyCart());
  }, []);

  return (
    <div>
      <h1 className="h1 text-center">My cart</h1>
      <p>id: {cart}</p>
    </div>
  );
}

export default Cart;
