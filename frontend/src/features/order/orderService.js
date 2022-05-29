import axios from 'axios';

const API_URL = '/api/v1/users/orders';

const getAllorders = async () => {
  const response = await axios.get(`${API_URL}/`);

  return response.data;
};

const createOrder = async (formDataOrder) => {
  const response = await axios.post(`${API_URL}/create`, formDataOrder);

  return response.data;
};

const orderService = {
  getAllorders,
  createOrder,
};

export default orderService;
