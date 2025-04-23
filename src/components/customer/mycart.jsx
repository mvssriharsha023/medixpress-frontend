import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import Cart from '../subcomponents/cartmedicines';

const Mycart = () => {
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
      <Cart />
    </>
  );
};

export default Mycart;