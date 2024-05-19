import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import Chart from 'chart.js/auto'; // Import Chart.js

const Order = () => {
  const [orders, setOrders] = useState([]);
  let pieChartRef = React.createRef(); // Reference to the canvas element for the pie chart
  let lineChartRef = React.createRef(); // Reference to the canvas element for the line chart
  let pieChart = null; // Variable to hold the Pie Chart.js instance
  let lineChart = null; // Variable to hold the Line Chart.js instance

  // Fetch orders from the server
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/_cart");
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Function to delete an order
  const deleteOrder = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete_order/${id}`);
      if (response.data.success) {
        fetchOrders(); // Refresh orders after deletion
        console.log("Order deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Function to update an order (placeholder)
  const updateOrder = (id) => {
    // Placeholder for updating order logic
    console.log("Update order with ID:", id);
  };

  // useEffect hook to fetch orders on component mount
  useEffect(() => {
    fetchOrders();

    // Render the pie chart
    renderPieChart();

    // Render the line chart
    renderLineChart();

    // Cleanup function to remove the chart when the component unmounts
    return () => {
      if (pieChart) {
        pieChart.destroy();
      }
      if (lineChart) {
        lineChart.destroy();
      }
    };
  }, []);

  // Function to render the pie chart
  const renderPieChart = () => {
    if (pieChartRef.current) {
      // If a chart instance already exists, destroy it before rendering a new one
      if (pieChart) {
        pieChart.destroy();
      }
      pieChart = new Chart(pieChartRef.current, {
        type: 'pie',
        data: {
          labels: ['Vega', 'Axor', 'SMK', 'Studds', 'Bolt'],
          datasets: [{
            data: [2, 30, 150, 40, 20],
            backgroundColor: [
              'red',
              'blue',
              'yellow',
              'green',
              'purple'
            ]
          }]
        },
        options: {
          maintainAspectRatio: false // Prevent the chart from maintaining aspect ratio
        }
      });
    }
  };

  // Function to render the line chart
  const renderLineChart = () => {
    if (lineChartRef.current) {
      // If a chart instance already exists, destroy it before rendering a new one
      if (lineChart) {
        lineChart.destroy();
      }
      lineChart = new Chart(lineChartRef.current, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: '2023',
            data: [1000, 1200, 1300, 1100, 1500, 1400, 1600], // Placeholder data for 2023
            borderColor: 'red',
            fill: false
          }, {
            label: '2024',
            data: [1200, 1100, 1000, 900, 800, 1000, 1100], // Placeholder data for 2024
            borderColor: 'blue',
            fill: false
          }]
        },
        options: {
          maintainAspectRatio: false, // Prevent the chart from maintaining aspect ratio
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Color',
      dataIndex: 'color',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => updateOrder(record._id)}>Edit</Button>
          <Button onClick={() => deleteOrder(record._id)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h2>Order</h2>
      <Table dataSource={orders} columns={columns} />
      <div style={{ marginTop: '15px' }}>
        
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ width: '400px', height: '400px', marginBottom: '100px' }}>
            <h3>Orders by Helmets</h3>
            <canvas ref={pieChartRef}></canvas>
          </div>
          <div style={{ width: '400px', height: '400px', marginBottom: '100px' }}>
            <h3>Profit/Loss Gain</h3>
            <canvas ref={lineChartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
