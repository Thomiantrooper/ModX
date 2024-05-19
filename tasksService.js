import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

const getTasks = async () => {
  const response = await axios.get(`${base_url}/tasks`);
  return response.data;
};

const addTask = async (task) => {
  const response = await axios.post(`${base_url}/tasks`, task, config);
  return response.data;
};

const updateTask = async (taskId, taskData) => {
  const response = await axios.patch(`${base_url}/tasks/${taskId}`, taskData, config);
  return response.data;
};

const deleteTask = async (taskId) => {
  const response = await axios.delete(`${base_url}/tasks/${taskId}`, config);
  return response.data;
};

const tasksService = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};

export default tasksService;
