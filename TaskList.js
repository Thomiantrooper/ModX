import React, { useState, useEffect, useRef } from "react";
import MyVerticallyCenteredModal from './UpdateTask';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTask, removeTaskFromList, deleteTaskFromServer } from "../features/tasks/tasksSlice";
import { getTasksFromServer } from './../features/tasks/tasksSlice';
import { useReactToPrint } from "react-to-print";
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import button from "react-bootstrap/Button";
import './TaskList.css';

const TasksList = () => {
  const { tasksList } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [filteredTasks, setFilteredTasks] = useState(tasksList);
  const [modalShow, setModalShow] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [filterKey, setFilterKey] = useState('All'); // Changed from using an empty array to a string

  const componentPDF = useRef();

  useEffect(() => {
    setFilteredTasks(tasksList);
  }, [tasksList]);

  const updateTask = (task) => {
    setModalShow(true);
    dispatch(setSelectedTask(task));
  };

  useEffect(() => {
    dispatch(getTasksFromServer());
  }, [dispatch]);

  const deleteTask = (task) => {
    dispatch(deleteTaskFromServer(task))
      .unwrap()
      .then(() => {
        dispatch(removeTaskFromList(task));
        toast.success("Task deleted successfully!"); // Toast for successful deletion
      })
      .catch(() => {
        toast.error("Failed to delete task!"); // Toast for deletion failure
      });
  };

  const handleFilter = (result) => {
    setFilterKey(result);
    filterTasks(result);
  };


  const handleSearch = () => {
    const filtered = tasksList.filter(task =>
      task.Model.toLowerCase().includes(searchKey.toLowerCase()) || // Search by Model
      task.QualityControlChecks.toLowerCase().includes(searchKey.toLowerCase()) // Search by Serial Number
    );
    setFilteredTasks(filtered);
  };


  const filterTasks = (result) => {
    if (result === 'All') {
      setFilteredTasks(tasksList);
    } else {
      const filtered = tasksList.filter(task =>
        task.Finalstatus.toLowerCase() === result.toLowerCase()
      );
      setFilteredTasks(filtered);
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "show services ",
    onAfterPrint: () => {
      toast.success("PDF downloaded successfully!"); // Toast for successful PDF download
    }
  });

  return (
    <>
      <div className="container">
        <div className="search-container">
          <input
            className="search-box"
            type="text"
            placeholder="Search..."
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>


        <div className="filters">
          <label>
            Filter by Test Result:
            <select onChange={(e) => handleFilter(e.target.value)} value={filterKey}>
              <option value="All">All</option>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
          </label>
          <button className="download-report" onClick={generatePDF}>
            Download Report
          </button>
        </div>
      </div>

      <div className="table-container" style={{ margin: "auto", width: "fit-content" }}>
        <table>
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Date</th>
              <th>Tester Name</th>
              <th>Model</th>
              <th>SerialNO</th>
              <th>Weight</th>
              <th>Materials Inspection</th>
              <th>Testing and Result</th>
              <th>Quality Control Checks</th>
              <th>Final status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr className="text-center" key={task._id}>
                <td>{index + 1}</td>
                <td>{new Date(task.date).toLocaleDateString()}</td>
                <td>{task.EmployeeTraining}</td>
                <td>{task.Model}</td>
                <td>{task.QualityControlChecks}</td>
                <td>{task.DocumentationandTraceability}</td>
                <td>
                  Shell Material : {task.MaterialsInspection}<br />
                  Liner Material : {task.LinerMaterial}<br />
                  Visor Material : {task.VisorMaterial}
                </td>
                <td>
                  <p>

                    Impact Standard: {task.ImpactStandard} <br />
                    Impact Result: {task.ImpactResult} <br />
                    <br></br>

                    Penetration Standard: {task.PenetrationStandard} <br />
                    Penetration Result: {task.PenetrationResult} <br />
                    <br></br>

                    Retention Standard: {task.RetentionStandard} <br />
                    Retention Result: {task.RetentionResult} <br />
                    <br></br>

                    Field Of Vision Standard: {task.FieldOfVisionStandard} <br />
                    Field Of Vision Result: {task.FieldOfVisionResult}
                  </p>
                </td>
                <td>
                  Visor attachment: {task.Visorattachment}<br />
                  Strap strength: {task.Strapstrength}<br />
                  Shell integrity: {task.Shellintegrity}
                </td>
                <td>{task.Finalstatus}</td>
                <td>
                  <button className="btn btn-primary mx-3" onClick={() => updateTask(task)}>
                    <i className="bi bi-pencil-square">Update</i>
                  </button>
                  <button className="btn btn-primary" onClick={() => deleteTask(task)}>
                    <i className="bi bi-trash3">Delete</i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'none' }}>
        <div ref={componentPDF}>
          <div className="report-container">
            {filteredTasks.map((task, index) => (
              <div key={task._id} className="report">
                <h1 className="c">Quality Assurance Report - {task.Model}</h1>
                <p>Date: {new Date(task.date).toLocaleDateString()}</p>
                <p>Tester Name :{task.EmployeeTraining}</p>
                <p>Serial no :{task.QualityControlChecks}</p>
                <p>Weight :{task.DocumentationandTraceability}</p>
                <hr className="report-hr" />
                <div className="report-section">
                  <h2 className="report-section-title">Materials Inspection</h2>
                  <div className="report-content">
                    <p>Shell Material: {task.MaterialsInspection}</p>
                    <p>Liner Material: {task.LinerMaterial}</p>
                    <p>Visor Material: {task.VisorMaterial}</p>
                  </div>
                </div>
                <hr className="report-hr" />
                <div className="report-section">
                  <h2 className="report-section-title">Testing and Results</h2>
                  <div className="report-content">
                    <ul className="report-list">
                      <li>
                        Impact Resistance:
                        <ul>
                          <li>Standard: {task.ImpactStandard}</li>
                          <li>Result: {task.ImpactResult}</li>
                        </ul>
                      </li>
                      <li>
                        Penetration Resistance:
                        <ul>
                          <li>Standard: {task.PenetrationStandard}</li>
                          <li>Result: {task.PenetrationResult}</li>
                        </ul>
                      </li>
                      <li>
                        Retention System:
                        <ul>
                          <li>Standard: {task.RetentionStandard}</li>
                          <li>Result: {task.RetentionResult}</li>
                        </ul>
                      </li>
                      <li>
                        Field Of Vision:
                        <ul>
                          <li>Standard: {task.FieldOfVisionStandard}</li>
                          <li>Result: {task.FieldOfVisionResult}</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <hr className="report-hr" />
                <div className="report-section">
                  <h2 className="report-section-title">Quality Control Checks</h2>
                  <div className="report-content">
                    <p>Visor Attachment: {task.Visorattachment}</p>
                    <p>Strap Strength: {task.Strapstrength}</p>
                    <p>Shell Integrity: {task.Shellintegrity}</p>
                  </div>
                </div>
                <hr className="report-hr" />

                <hr className="report-hr" />
                <div className="report-section">
                  <h2 className="report-section-title">Final Status</h2>
                  <div className="report-content">
                    <p>{task.Finalstatus}</p>
                    <br></br>
                  </div>
                </div>
                {index !== filteredTasks.length - 1 && <hr className="report-hr" />}
              </div>
            ))}
          </div>


        </div>
      </div>

      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />

      {/* Toast Container for displaying toasts */}
      <ToastContainer />
    </>
  );
};

export default TasksList;