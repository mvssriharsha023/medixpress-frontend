import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../subcomponents/search';
import CarouselRatio from '../subcomponents/corousal';

const CustomerHomePage = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!token || role !== 'CUSTOMER') {
      navigate('/');
    }
  }, [navigate, role, token]);

  if (!token || role !== 'CUSTOMER') {
    return null;
  }

  return (
    <div
      style={{
        backgroundImage:
          'url(https://plus.unsplash.com/premium_photo-1668487827029-2bd54133c303?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflowX: 'hidden', // Prevent horizontal scrolling
      }}
    >
      <Navbar />

      {/* Main Container for SearchBox and Carousel */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          minHeight: '100vh',
          paddingTop: '10vh', // Adjust the padding for positioning
          paddingLeft: '16px',
          paddingRight: '16px',
          width: '100%',
        }}
      >
        {/* Full width Search Box */}
        <div style={{ width: '100%' }}>
          <SearchBox />
        </div>

        {/* Carousel inside a styled container */}
        <div
          style={{
            marginTop: '40px',
            width: '90%',
            backgroundColor: 'rgba(23, 147, 214, 0.55)', // Light background
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CarouselRatio />
        </div>
      </div>
    </div>
  );
};

export default CustomerHomePage;
