import axios from 'axios';

const API_URL = '/api/v1/users/';

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  return response.data;
};

const logout = async () => {
  const response = await axios.delete(`${API_URL}/logout`);

  return response.data;
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
