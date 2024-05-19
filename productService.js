import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);
  return response.data;
};

const updateProduct = async (productId, productData) => {
  const response = await axios.put(`${base_url}product/${productId}`, productData, config);
  return response.data;
};

const deleteProduct = async (productId) => {
  const response = await axios.delete(`${base_url}product/${productId}`, config);
  return response.data;
};

// Function to update product quantity
const updateProductQuantity = async (productId, quantity) => {
  const response = await axios.put(`${base_url}product/${productId}/updateQuantity`, { quantity }, config);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductQuantity, 
  }

export default productService;
