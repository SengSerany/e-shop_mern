import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { validateCart } from '../features/cart/cartSlice';

function OrderValidate() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateCart());
  });
  return (
    <div>
      <h1 className="h1 text-center">Order validate</h1>
    </div>
  );
}

export default OrderValidate;
