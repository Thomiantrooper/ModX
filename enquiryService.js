import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

const getEnquiries = async () => {
  const response = await axios.get(`${base_url}enquiry/`);
  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${base_url}enquiry/${id}`, config);
  return response.data;
};

const getEnquiry = async (id) => {
  const response = await axios.get(`${base_url}enquiry/${id}`);
  return response.data;
};

const updateEnquiry = async (enq) => {
  const response = await axios.put(
    `${base_url}enquiry/${enq.id}`,
    { status: enq.enqData },
    config
  );
  return response.data;
};

const createEnquiry = async (enquiryData) => {
  const response = await axios.post(`${base_url}enquiry/`, enquiryData, config);
  return response.data;
};

// Function to update enquiry with manager reply
const replyToEnquiry = async (enquiryId, managerReply) => {
  const response = await axios.put(
    `${base_url}enquiry/${enquiryId}/reply`,
    { managerReply },
    config
  );
  return response.data;
};

const enquiryService = {
  getEnquiries,
  deleteEnquiry,
  getEnquiry,
  updateEnquiry,
  createEnquiry,
  replyToEnquiry, // Include the new function for manager reply
};

export default enquiryService;
