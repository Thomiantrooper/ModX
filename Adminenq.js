import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../utils/baseUrl';
import { Table, Space, Input, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const { TextArea } = Input;

const Adminenq = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [managerReplies, setManagerReplies] = useState({}); // Object to store manager replies for each enquiry

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get(`${base_url}enquiry`);
      // Assuming response.data is an array of enquiry objects with unique IDs
      setEnquiries(response.data);
      // Initialize manager replies object with default values for each enquiry
      const initialReplies = response.data.reduce((acc, enquiry) => {
        acc[enquiry._id] = '';
        return acc;
      }, {});
      setManagerReplies(initialReplies);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast.error('Failed to fetch enquiries. Please try again later.'); // Removed toast.POSITION
    }
  };

  const handleEdit = (enquiryId) => {
    setEditingId(enquiryId);
    // Implement logic to populate form fields with enquiry details for editing
  };

  const handleUpdate = async (updatedEnquiry) => {
    try {
      await axios.put(`${base_url}enquiry/${updatedEnquiry._id}`, updatedEnquiry);
      toast.success('Enquiry updated successfully');
      setEditingId(null);
      // Refetch enquiries to update the list
      fetchEnquiries();
    } catch (error) {
      console.error('Error updating enquiry:', error);
      toast.error('Failed to update enquiry. Please try again later.'); // Removed toast.POSITION
    }
  };

  const handleDelete = async (enquiryId) => {
    try {
      await axios.delete(`${base_url}enquiry/${enquiryId}`);
      toast.success('Enquiry deleted successfully');
      // Refetch enquiries to update the list
      fetchEnquiries();
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      toast.error('Failed to delete enquiry. Please try again later.'); // Removed toast.POSITION
    }
  };

  const handleReplyChange = (enquiryId, value) => {
    setManagerReplies({ ...managerReplies, [enquiryId]: value });
  };

  const handleReplySubmit = async (enquiryId) => {
    try {
      await axios.put(`${base_url}enquiry/${enquiryId}/reply`, { managerReply: managerReplies[enquiryId] });
      toast.success('Reply submitted successfully');
      // Clear manager reply input field after submission
      setManagerReplies({ ...managerReplies, [enquiryId]: '' });
      // Refetch enquiries to update the list
      fetchEnquiries();
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast.success('Reply submitted successfully'); // Removed toast.POSITION
    }
  };

  // Columns for the Ant Design table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <button onClick={() => handleEdit(record._id)}>Edit</button>
          <button onClick={() => handleDelete(record._id)}>Delete</button>
        </Space>
      ),
    },
    {
      title: 'Manager Reply',
      dataIndex: 'managerReply',
      key: 'managerReply',
      render: (text, record) => (
        <Space size="middle">
          {/* Render manager reply content here */}
          
          {record.managerReply ? record.managerReply : 'Thank you for the reply'}
        </Space>
      ),
    },
    {
      title: 'Reply',
      key: 'reply',
      render: (text, record) => (
        <Space size="middle">
        <TextArea
        rows={4} // Increase the number of rows to make it bigger
        style={{ width: '1000%' }}
        value={managerReplies[record._id] || 'Thank you'}
        onChange={(e) => setManagerReplies({ ...managerReplies, [record._id]: e.target.value })}
        placeholder="Thank you for yor feedback we would encourage this support"
      />
          <Button type="primary" onClick={() => handleReplySubmit(record._id)}>
            Submit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <h2>Enquiries</h2>
      <Table columns={columns} dataSource={enquiries} rowKey="_id" />
      <ToastContainer />
    </div>
  );
};

export default Adminenq;
