import React, { useEffect, useState } from 'react';
import axios from "axios";

function View_employeedetails() {
  const [dataListState, setDataListState] = useState([]); // State for dataList
  const [error, setError] = useState(null); // State for error

  const getFetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/");
      if (response.data.success) {
        setDataListState(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later."); // Set error state
    }
  };

  useEffect(() => {
    getFetchData(); // Call fetchData function
  }, []);

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log("Edit employee with ID:", id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete/${id}`);
      if (response.data.success) {
        alert(response.data.message);
        getFetchData();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      setError("Error deleting data. Please try again later."); // Set error state
    }
  };

  return (
    <div>
      {error && <p>{error}</p>} {/* Display error message if there's an error */}
      <div style={{ marginTop: '40px', marginLeft: '40px' }} className='tableContainer'>
        <table style={{ border: '1px solid black', boxShadow: '5px 5px 10px rgba(0,0,0,0.3)' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgb(248, 143, 16)' }}>
              <th style={{ minWidth: '200px', padding: '1px', textAlign: 'center' }}>Name</th>
              <th style={{ minWidth: '200px', padding: '1px', textAlign: 'center' }}>Email</th>
              <th style={{ minWidth: '200px', padding: '1px', textAlign: 'center' }}>Reason</th>
              <th style={{ minWidth: '200px', padding: '1px', textAlign: 'center' }}>AbsenceFrom</th>
              <th style={{ minWidth: '200px', padding: '1px', textAlign: 'center' }}>AbsenceThrough</th>
              <th style={{ minWidth: '200px', padding: '1px', textAlign: 'center' }}>Date/Time Submitted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataListState.map((el) => {
              return (
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.reason}</td>
                  <td>{new Date(el.start).toLocaleDateString()}</td>
                  <td>{new Date(el.end).toLocaleDateString()}</td>

                  <td>
                    <button style={{ fontSize: '16px', padding: '5px 10px', margin: '0px 10px', border: 'none', borderRadius: '5px', backgroundColor: 'yellow' }} className='btn-edit' onClick={() => handleEdit(el._id)}>Edit</button>
                    <button style={{ fontSize: '16px', padding: '5px 10px', margin: '0px 10px', border: 'none', borderRadius: '5px', backgroundColor: 'red', color: 'white' }} className='btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View_employeedetails;
