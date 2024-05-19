import React from "react";
import { IoMdClose } from "react-icons/io";
import "../App.css";

const FormTable = ({
  handleSubmit,
  handleOnChange,
  handleClose,
  rest,
  viewFeedback,
}) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        {viewFeedback ? (
          <div>
            <div className="closebtn" onClick={handleClose}>
              <IoMdClose />
            </div>
            <h3 className="form-heading">View Feedback</h3>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={viewFeedback.email}
              disabled
            />
            <label htmlFor="feedback">Feedback:</label>
            <textarea
              id="feedback"
              name="feedback"
              rows="4"
              value={viewFeedback.feedback}
              disabled
            ></textarea>
            <label htmlFor="reply">Reply:</label>
            <textarea
              id="reply"
              name="reply"
              rows="4"
              value={viewFeedback.reply}
              disabled
            ></textarea>
          </div>
        ) : (
          <>
            <div className="closebtn" onClick={handleClose}>
              <IoMdClose />
            </div>
            <h3 className="form-heading">Feedback</h3>
            <label htmlFor="email">email : </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleOnChange}
              value={rest.email}
            />
            <label htmlFor="feedback">feedback : </label>
            <textarea
              id="feedback"
              name="feedback"
              rows="4"
              onChange={handleOnChange}
              value={rest.feedback}
            ></textarea>
            <button className="btn">Submit</button>
          </>
        )}
      </form>
    </div>
  );
};

export default FormTable;
