import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import medicineIcon from './medicine.png';

const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(6, 32, 106, 0.35)',
  backdropFilter: 'blur(16px) saturate(180%)',
  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
  position: 'fixed', // Changed from sticky to fixed
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.drawer + 1,
}));
const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    '& img': {
      filter: 'drop-shadow(0 0 6px rgba(79, 172, 254, 0.7))',
    }
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
}));

const LogoIcon = styled('img')({
  height: '36px',
  width: '36px',
  filter: 'drop-shadow(0 0 4px rgba(79, 172, 254, 0.5))',
  transition: 'all 0.3s ease',
});

const LogoText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(90deg, rgba(5, 50, 90, 0.9) 0%, rgba(7, 128, 135, 0.9) 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  fontWeight: 'bold',
  fontSize: '1.8rem',
  letterSpacing: '0.8px',
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'rgba(3, 10, 89, 0.95)',
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 3),
  position: 'relative',
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  fontSize: '1.1rem',
  fontWeight: 700,
  minWidth: '120px',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, rgba(86, 193, 229, 0.25) 0%, rgba(9, 154, 161, 0.25) 100%)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 28px rgba(79, 172, 254, 0.3)',
    color: '#fff',
    '&:before': {
      transform: 'translateX(0)',
    },
  },
  '&:active': {
    transform: 'translateY(0) scale(0.96)',
  },
}));

const NavButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  alignItems: 'center',
  gap: theme.spacing(4),
  padding: theme.spacing(1, 3),
  borderRadius: '16px',

}));


const Navbar = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const navigateHome = () => {
    if (role === 'CUSTOMER') {
      navigate('/customer/home');
    } else if (role === 'PHARMACY') {
      navigate('/pharmacy/home');
    } else {
      navigate('/');
    }
  };

  return (
    <GlassAppBar sx={{ margin: 0 }}>
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        
      }}>
        <LogoContainer onClick={navigateHome}>
          <LogoIcon src={medicineIcon} alt="Medicine Icon" />
          <LogoText>MediXpress</LogoText>
        </LogoContainer>

        <NavButtonGroup>
          {role === 'CUSTOMER' && (
            <>
              <NavButton onClick={() => navigate('/customer/home')}>Home</NavButton>
              <NavButton onClick={() => navigate('/cart')}>My Cart</NavButton>
              <NavButton onClick={() => navigate('/orders')}>Orders</NavButton>
            </>
          )}

          {role === 'PHARMACY' && (
            <>
              <NavButton onClick={() => navigate('/pharmacy/home')}>Home</NavButton>
              <NavButton onClick={() => navigate('/inventory')}>Inventory</NavButton>
              <NavButton onClick={() => navigate('/orders')}>Orders</NavButton>
            </>
          )}
        </NavButtonGroup>

        <NavButton 
          onClick={handleLogout}
          sx={{
            background: 'rgba(255, 75, 75, 0.2)',
            '&:hover': {
              background: 'rgba(255, 75, 75, 0.3)',
            }
          }}
        >
          Log Out
        </NavButton>
      </Toolbar>
    </GlassAppBar>
  );
};

export default Navbar;