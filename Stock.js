import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { getProducts, updateProductQuantity } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';

import { SearchOutlined } from '@ant-design/icons';

const Stock = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    // Check for products with quantity <= 10
    const lowStockProducts = products.filter(product => product.quantity <= 10);

    // Display toast for each low stock product
    lowStockProducts.forEach(product => {
      toast.warning(`Order ${product.title}, low stock!`);
    });
  }, [products]);

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedProduct(null); // Reset selected product when modal is closed
  };

  const handleFormSubmit = (values) => {
    const { quantity } = values;
    if (!quantity) {
      message.error('Please input the quantity!');
      return;
    }

    dispatch(updateProductQuantity({ id: selectedProduct._id, quantity }))
      .then(() => {
        message.success('Item ordered successfully!');
        setIsModalVisible(false);
        setSelectedProduct(null);
      })
      .catch((error) => {
        message.error('Failed to update quantity. Please try again later.');
        console.error('Failed to update quantity:', error);
      });
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.text('Products Report', 10, 10);
    doc.text('This report contains details of all products available.', 10, 20);

    // Add table of product details to PDF
    let yPos = 30;
    products.forEach(product => {
      doc.text(`Title: ${product.title}`, 10, yPos);
      doc.text(`Price: ${product.price}`, 10, yPos + 10);
      doc.text(`Category: ${product.category}`, 10, yPos + 20);
      doc.text(`Quantity: ${product.quantity}`, 10, yPos + 30);
      doc.text(`Brand: ${product.brand}`, 10, yPos + 40);
      doc.text(`Sold: ${product.sold}`, 10, yPos + 50);
      yPos += 70; // Move to next product
    });

    doc.save('products_report.pdf');
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          // We don't need this line anymore
        });
      }
    },
    render: text =>
      searchText ? (
        <span>
          {text.split(new RegExp(`(${searchText})`, 'gi')).map((fragment, i) => (
            fragment.toLowerCase() === searchText.toLowerCase()
              ? <span key={i} style={{ backgroundColor: '#ffc069' }}>{fragment}</span> : fragment // eslint-disable-line
          ))}
        </span>
      ) : (
        text
      ),
  });

  const stockColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      ...getColumnSearchProps('title', 'Search by Title'),
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      ...getColumnSearchProps('category', 'Search by Category'),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      ...getColumnSearchProps('brand', 'Search by Brand'),
    },
    {
      title: 'Sold',
      dataIndex: 'sold',
    },
    {
      title: 'Actions',
      render: (_, record) => {
        let stockColor = '';
        let buttonDisabled = false;

        if (record.quantity <= 10) {
          stockColor = 'red';
        } else if (record.quantity > 10 && record.quantity <= 25) {
          stockColor = 'yellow';
          buttonDisabled = true;
        } else {
          stockColor = 'green';
          buttonDisabled = true; // Disable button for quantities greater than 25
        }

        return (
          <div>
            <Button
              type="primary"
              onClick={() => handleOrderClick(record)}
              disabled={buttonDisabled}
              style={{ marginRight: '10px', opacity: buttonDisabled ? '0.5' : '1' }}
              className="order-button"
            >
              Order
            </Button>
            <div
              style={{
                backgroundColor: stockColor,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'inline-block',
              }}
              className="stock-indicator"
            />
          </div>
        );
      },
    },
  ];

  const filteredData = searchText ? products.filter(product =>
    Object.values(product).some(val =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  ) : products;

  return (
    <div className="container">
      <h2>Stock Details</h2>
      {/* Button for downloading report */}
      <Button type="primary" onClick={downloadReport} style={{ marginBottom: '15px' }}>
        Download Report
      </Button>
      {/* Table for displaying stock details */}
      <Table columns={stockColumns} dataSource={filteredData} />
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // No footer for this modal
      >
        {selectedProduct && (
          <Form
            name="orderForm"
            initialValues={{ remember: true }}
            onFinish={handleFormSubmit}
          >
            <Form.Item
              name="product"
              label="Product"
              initialValue={selectedProduct.title}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: 'Please input the quantity!' }]}
            >
              <Input type="number" min={1} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Stock;
