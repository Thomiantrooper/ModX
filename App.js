import React, { useState, useEffect } from "react";
import axios from "axios";
import FormTable from "./components/FormTable.js";
import "./App.css"; // Import your CSS file

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
  const [addSection, setAddSection] = useState(true); // Initially set to true to display the form
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    feedback: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    email: "",
    feedback: "",
    _id: "",
  });
  const [dataList, setDataList] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/create", formData);
      if (response.data.success) {
        alert(response.data.message);
        setAddSection(false);
        fetchData();
        setFormData({
          email: "",
          feedback: "",
        });
      } else {
        console.error("Failed to create new feedback:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating new feedback:", error);
      alert("An error occurred while creating new feedback.");
    }
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  const handleEditChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("/update", formDataEdit);
      if (response.data.success) {
        alert(response.data.message);
        setEditSection(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
      alert(
        "An error occurred while updating feedback. Please try again later."
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/delete/${id}`);
      if (response.data.success) {
        alert(response.data.message);
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert(
        "An error occurred while deleting feedback. Please try again later."
      );
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/");
      if (response.data.success) {
        const currentTime = new Date();
        const newDataList = response.data.data.map((item) => {
          const submissionTime = new Date(item.createdAt);
          const timeDiffMinutes = (currentTime - submissionTime) / (1000 * 60);
          return {
            ...item,
            editable: timeDiffMinutes <= 1,
            submissionTime: submissionTime.toLocaleString(), // Format date/time
          };
        });
        // Reverse the order of the dataList array to display the latest feedbacks on top
        setDataList(newDataList.reverse());
      } else {
        console.error("Server response indicates failure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data from server:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data periodically
    }, 60000); // Refresh every 1 minute (adjust as needed)

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []); // Empty dependency array ensures it only runs once on mount

  const handleClose = () => {
    setAddSection(false); // Close the form
    setEditSection(false);
    setSelectedFeedback(null);
  };

  const handleView = (feedback) => {
    setSelectedFeedback(feedback);
    setAddSection(false); // Hide the New Feedback button when viewing feedback
  };

  return (
    <div className="addContainer">
      {addSection && ( // Display the form only when addSection is true
        <FormTable
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleClose={handleClose}
          rest={formData}
        />
      )}

      {!addSection && !selectedFeedback && <h2>Your Feedbacks</h2>}

      {!addSection &&
        !selectedFeedback && ( // Show the New Feedback button conditionally
          <button className="btn btn-add" onClick={() => setAddSection(true)}>
            New Feedback
          </button>
        )}

      {editSection && (
        <FormTable
          handleSubmit={handleEditSubmit}
          handleOnChange={handleEditChange}
          handleClose={handleClose}
          rest={formDataEdit}
        />
      )}

      {!selectedFeedback && ( // Show only if no feedback is selected
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Feedback</th>
                <th>Replies</th>
                <th>Date/Time</th> {/* New column */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((el) => (
                <tr key={el._id}>
                  <td>{el.email}</td>
                  <td className="feedback">{el.feedback}</td>
                  <td className="replies">{el.reply}</td>
                  <td>{el.submissionTime}</td> {/* Display submission time */}
                  <td>
                    {el.editable ? (
                      <>
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(el)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(el._id)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-view"
                        onClick={() => handleView(el)}
                      >
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedFeedback && (
        <div className="feedback-form">
          <h3>Feedback</h3>
          <textarea
            className="feedback-textarea"
            readOnly
            value={selectedFeedback.feedback}
          ></textarea>
          <h3>Reply</h3>
          <textarea
            className="reply-textarea"
            readOnly
            value={selectedFeedback.reply}
          ></textarea>
          <button className="btn btn-close" onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
