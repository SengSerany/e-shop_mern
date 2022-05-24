// import axios from 'axios';

const API_URL = '/api/v1/users/cart';

const getCart = async () => {
  const response = await fetch(`${API_URL}/`);
  const data = await response.json();
  return data;
};

const cartService = {
  getCart,
};

export default cartService;
