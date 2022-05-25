import axios from 'axios';

const getCart = async () => {
  const response = await fetch(`/api/v1/users/cart/`);
  const data = await response.json();
  return data;
};

const addProduct = async (linkObj) => {
  const response = await axios.post(`/api/v1/products/cart/add`, linkObj);

  return response.data;
};

const removeProduct = async (linkID) => {
  const response = await axios.delete(`/api/v1/products/cart/sub`, {
    data: {
      linkID: linkID,
    },
  });

  return response.data;
};

const cartService = {
  getCart,
  removeProduct,
  addProduct,
};

export default cartService;
