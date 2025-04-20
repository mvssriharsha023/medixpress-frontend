import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const Myorderhistory = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (token === null || role !== "CUSTOMER") {
      navigate("/");
    }
  })
  return (
    <>
      <Navbar />
    </>
  );
};

export default Myorderhistory  ;