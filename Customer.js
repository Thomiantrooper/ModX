import React, { useEffect, useState } from 'react';
import { Table, Input, message } from "antd"; // Import Input component from antd
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/user/userSlice';
import { PDFDownloadLink } from '@react-pdf/renderer';
import UserReportPDF from './UserReportPDF';

const columns = [
  {
    title: "sNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Role",
    dataIndex: "role",
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search Role"
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <button
          type="button"
          onClick={() => {
            setSelectedKeys([]);
            clearFilters();
          }}
          style={{ width: 90, marginRight: 8 }}
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => confirm()}
          style={{ width: 90 }}
        >
          OK
        </button>
      </div>
    ),
    onFilter: (value, record) => record.role.toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: "Logged Time",
    dataIndex: "loggedTime",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => {
      const userRole = record.role.toLowerCase();
      if (userRole === 'tester') {
        return <ActionButton record={record} />;
      } else {
        return null; // Render nothing for users with roles other than "tester"
      }
    },
  },
];

const ActionButton = ({ record }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [resetTime, setResetTime] = useState(null);

  const handleAllocateMachinery = () => {
    // Logic to handle machinery allocation
    console.log(`Allocate machinery for ${record.name}`);
    // Add your logic here
    setButtonClicked(true);

    // Set reset time after 10 minutes
    const currentTime = new Date().getTime();
    const resetTime = new Date(currentTime + 10 * 60 * 1000); // 10 minutes from now
    setResetTime(resetTime);
  };

  useEffect(() => {
    // Reset button after 10 minutes
    if (resetTime) {
      const timer = setTimeout(() => {
        setButtonClicked(false);
        setResetTime(null);
      }, 10 * 60 * 1000); // 10 minutes in milliseconds

      return () => clearTimeout(timer);
    }
  }, [resetTime]);

  const remainingTime = resetTime ? Math.floor((resetTime - new Date().getTime()) / 1000) : null;

  const buttonStyle = {
    backgroundColor: buttonClicked ? 'red' : 'green',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: buttonClicked ? 'not-allowed' : 'pointer', // Change cursor to not-allowed when button is clicked
    borderRadius: '5px', // Rounded corners
  };

  return (
    <div>
      <button
        onClick={handleAllocateMachinery}
        style={buttonStyle}
      >
        Allocate Machinery
      </button>
      {remainingTime && <span>{`Reset in ${remainingTime} seconds`}</span>}
    </div>
  );
};

const Customer = () => {
  const dispatch = useDispatch();
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getUserFromDb();
  }, []);

  const getUserFromDb = () => {
    dispatch(getUsers());
  }

  const userState = useSelector(state => state.auth.user);

  useEffect(() => {
    // Display toast when a new user logs in
    if (userState && userState.loggedIn) {
      message.info(`New user (${userState.name}) has joined the server`); // Display toast message
    }
  }, [userState]); // Trigger when userState changes

  let data1 = [];
  if (Array.isArray(userState)) {
    data1 = userState.filter(user => user.role !== "admin").map((user, index) => ({
      key: index + 1,
      name: user.firstname + " " + user.lastname,
      email: user.email,
      mobile: user.mobile,
      role: user.role, // Add role
      loggedTime: user.loggedTime, // Add logged time
    }));
  }

  const handleSearch = (selectedKeys, confirm) => {
    if (selectedKeys[0].trim() === '') {
      message.error('Invalid search term');
      return;
    }
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  return (
    <div>
      <h3 className='mb-4 title'></h3>
      <div>
        <Input.Search
          placeholder="Search..."
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200, marginBottom: 16 }}
        />
        <Table
          columns={columns}
          dataSource={data1.filter(item =>
            item.role.toLowerCase().includes(searchText.toLowerCase()) ||
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.email.toLowerCase().includes(searchText.toLowerCase()) ||
            item.mobile.includes(searchText)
          )}
          onFilterDropdownVisibleChange={(visible) => {
            if (visible) {
              setTimeout(() => setSearchedColumn('role'), 0);
            }
          }}
          onChange={() => setSearchedColumn('')}
          searchText={searchedColumn === 'role' ? undefined : null}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <PDFDownloadLink document={<UserReportPDF users={data1} />} fileName="user_report.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Generating PDF...' : 'Download PDF Report'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Customer;
