import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (token === null || role !== "PHARMACY") {
      navigate("/");
    }
  })
  
  return (
    <>
      <Navbar />

    </>
  );
};

export default HomePage;
