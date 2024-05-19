import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Popconfirm, Form, Input, InputNumber, Modal, Select } from "antd";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProducts, getProducts, updateProduct, deleteProduct } from '../features/products/productSlice';
import { Link } from 'react-router-dom';

const { Option } = Select;

const Adminproduct = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [form] = Form.useForm();
  const [editProduct, setEditProduct] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const onFinish = async (values) => {
    try {
      if (editProduct) {
        await dispatch(updateProduct({ id: editProduct.key, ...values }));
        toast.success('Product updated successfully');
        setEditModalVisible(false);
      } else {
        await dispatch(createProducts(values));
        toast.success('Product created successfully');
      }
      form.resetFields();
    } catch (error) {
      toast.error('Failed to update product');
      console.error(error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await dispatch(deleteProduct(productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setEditModalVisible(true);
    form.setFieldsValue({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      brand: product.brand,
      sold: product.sold,
    });
  };

  const createdProductsColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Sold',
      dataIndex: 'sold',
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>{record.sold}</Button>
      ),
    },
    {
      title: 'Action',
      dataIndex: '',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure delete this product?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const createdProductsData = products.map((product) => ({
    key: product._id,
    title: product.title,
    price: product.price,
    category: product.category,
    quantity: product.quantity,
    brand: product.brand,
    sold: product.sold,
  }));

  return (
    <div className="container">
      <div className="form-container">
        <h2>{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
        {/* Form for adding/editing products */}
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price' }]}>
            <InputNumber min={0} step={0.01} />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select the category' }]}>
            <Select>
              
              <Option value="Branded">Branded</Option>
              <Option value="Non-branded">Non-branded</Option>
            </Select>
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter the quantity' }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="brand" label="Brand" rules={[{ required: true, message: 'Please enter the brand' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="sold" label="Sold" rules={[{ required: true, message: 'Please enter the number of sold items' }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">{editProduct ? 'Update' : 'Add'}</Button>
          </Form.Item>
        </Form>
      </div>

      <h2>Created Products</h2>
      {/* Table for displaying created products */}
      <Table columns={createdProductsColumns} dataSource={createdProductsData} />

      <ToastContainer />

      {/* Modal for editing sold quantity */}
      <Modal
        title="Edit Sold Quantity"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            sold: editProduct ? editProduct.sold : null
          }}
        >
          <Form.Item name="sold" label="Sold" rules={[{ required: true, message: 'Please enter the number of sold items' }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Button type="primary" onClick={() => form.submit()}>Update</Button>
        </Form>
      </Modal>
      <Link to="/stock">
        <Button type="primary">Update Stock</Button>
      </Link>
    </div>
  );
};

export default Adminproduct;
