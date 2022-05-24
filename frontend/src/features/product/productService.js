const API_URL = '/api/v1/products';

const getAllProducts = async () => {
  const response = await fetch(`${API_URL}/`);
  const data = await response.json();
  if (data) {
    return data;
  } else {
    return [];
  }
};

const productService = {
  getAllProducts,
};

export default productService;
