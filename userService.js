import axios from "axios";
import { base_url } from "../../utils/axiosConfig";
import { config } from "../../utils/axiosConfig";

const register = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/login`, userData);
    localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const updateUser = async (data) => {
  try {
    const response = await axios.put(`${base_url}user/edit-user`, data, config);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const forgotPassToken = async (data) => {
  try {
    const response = await axios.post(`${base_url}user/forgotPasswordToken`, data, config);
    return response.data;
  } catch (error) {
    console.error("Error sending forgot password token:", error);
    throw error;
  }
};

const resetPass = async (data) => {
  try {
    const response = await axios.put(`${base_url}user/resetPassword/${data.token}`, { password: data?.password }, config);
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

const getUsers = async () => {
  try {
    const response = await axios.get(`${base_url}user/all-users`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const deleteUser = async () => {
  try {
    const response = await axios.delete(`${base_url}user/:id`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting user :", error);
    throw error;
  }
};

export const authService = {
  register,
  login,
  updateUser,
  forgotPassToken,
  resetPass,
  getUsers,
  deleteUser,
};
