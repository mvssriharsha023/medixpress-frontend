import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../subcomponents/search';
import CarouselRatio from '../subcomponents/corousal';
import { motion } from 'framer-motion';

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
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
      }}
    >
      <Navbar />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          minHeight: '100vh',
          paddingTop: '5vh', // Reduced from 10vh to 5vh
          paddingLeft: '16px',
          paddingRight: '16px',
          width: '100%',
        }}
      >
        <div style={{ width: '100%' }}>
          <SearchBox />
        </div>

        <div
          style={{
            marginTop: '30px',
            marginBottom: '50px',
            width: '70%',
            // Glass effect using rgba with backdrop-filter for blur
            backgroundColor: 'rgba(26, 205, 233, 0.45)',
            backdropFilter: 'blur(30px)', // Adding the blur effect
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            position: 'relative',
          }}
        >
          <CarouselRatio />

          <motion.div
            style={{
              marginTop: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '50px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <div
              style={{
                width: '200px',
                height: '24px',
                border: '2px solid #000',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.div
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'rgba(6, 32, 106)',
                  borderRadius: '50%',
                }}
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHomePage;
