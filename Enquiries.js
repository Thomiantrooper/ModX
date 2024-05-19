import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAEnquiry, getEnquiries, updateAEnquiry, deleteAEnquiry } from '../features/enquiry/enquirySlice';
import { Table, Button, Space, Modal, Input, Form, Select } from 'antd';
import axios from 'axios'; // Import axios
import { base_url } from '../utils/baseUrl'; // Import base_url

const { TextArea } = Input;
const { Option } = Select;

const Enquiries = () => {
  const dispatch = useDispatch();
  const enquiries = useSelector(state => state.enquiries.enquiries || []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    comment: '',
    status: 'Submitted'
  });
  const [editingEnquiry, setEditingEnquiry] = useState(null);
  const [managerReplies, setManagerReplies] = useState({}); // State to store manager replies

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  const handleEdit = (record) => {
    setFormData({
      name: record.name,
      email: record.email,
      mobile: record.mobile,
      comment: record.comment,
      status: record.status,
      
    });
    setEditingEnquiry(record);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Delete Enquiry',
      content: 'Are you sure you want to delete this enquiry?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deleteAEnquiry(record.id));
        window.location.reload();
      },
      onCancel() {
        // Do nothing
      },
    });
  };

  const handleReplySubmit = async (record) => {
    const enquiryId = record._id;
    const reply = managerReplies[enquiryId];
    if (reply) {
      await replyToEnquiry(enquiryId, reply);
      // Optionally handle success or update UI
    } else {
      // Handle empty reply
    }
  };

  const replyToEnquiry = async (enquiryId, managerReply) => {
    try {
      await axios.put(
        `${base_url}enquiry/${enquiryId}/reply`,
        { managerReply }
      );
      // Handle success if needed
    } catch (error) {
      console.error('Error replying to enquiry:', error);
      // Handle error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingEnquiry) {
      dispatch(updateAEnquiry({ ...formData, id: editingEnquiry.id }));
      setEditingEnquiry(null);
    } else {
      dispatch(createAEnquiry(formData));
    }
    clearFormData();
    window.location.reload();
  };

  const clearFormData = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      comment: '',
      status: 'Submitted'
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150, // Adjust the width as needed
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200, // Adjust the width as needed
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 150, // Adjust the width as needed
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
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="danger" onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
    {
      title: 'Manager Reply',
      key: 'managerReply',
      render: (text, record) => (
        <Space size="middle">
          {/* Render manager reply content here */}
          {record.managerReply ? record.managerReply : 'Thank you'}
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
            cols={40}
            value={managerReplies[record._id] || 'Thank you'}
            onChange={(e) => setManagerReplies({ ...managerReplies, [record._id]: e.target.value })}
            placeholder="Thank you"
          />
          <Button type="primary" onClick={() => handleReplySubmit(record)}>
            Submit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2>Enquiry Form</h2>
        <Form layout="vertical" onFinish={handleSubmit} initialValues={formData}>
          <Form.Item label="Name" name="name" required>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" required>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Mobile" name="mobile" required>
            <Input type="tel" />
          </Form.Item>
          <Form.Item label="Comment" name="comment" required>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Status" name="status" required>
            <Select>
              <Option value="Submitted">Submitted</Option>
              <Option value="Contacted">Contacted</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Resolved">Resolved</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">{editingEnquiry ? 'Update' : 'Submit'}</Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <h2> Enquiries</h2>
        <Table columns={columns} dataSource={enquiries} rowKey="_id" scroll={{ x: 800 }} /> {/* Adjust the width as needed */}
      </div>
    </div>
  );
};

export default Enquiries;
