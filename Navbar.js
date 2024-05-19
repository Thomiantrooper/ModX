import React, { useState } from "react";
import { useSelector } from 'react-redux';

const Navbar = ({ handleSearch }) => {

  const { tasksList, error } = useSelector((state) => state.tasks)


  return (
    <>
      <h1 className="text-center my-4 text-primary">MODEX PRODUCTION & QUALITY ASSURANCE </h1>
      <p className="text-center lead">{`Currently ${tasksList.length} Reports(s) pending`}</p>
      {
        (error !== '') ? <h5 className="text-center text-danger">{error}</h5> : null
      }

    </>
  );
};

export default Navbar;
