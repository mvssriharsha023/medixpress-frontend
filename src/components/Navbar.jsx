import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import medicineIcon from './medicine.png';

const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background:  'rgba(26, 205, 233, 0.45)',
  backdropFilter: 'blur(16px) saturate(180%)',
  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
  position: 'fixed',
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

const NavButton = styled(Button)(({ theme, active }) => ({
  height: '100%',
  color: active ? 'white' : 'rgba(3, 10, 89, 0.95)',
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 3),
  position: 'relative',
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  fontSize: '1.1rem',
  fontWeight: 700,
  minWidth: '120px',
  background: active ? 'linear-gradient(90deg, rgba(7, 82, 107, 0.25) 0%, rgba(11, 148, 155, 0.25) 100%)' : 'transparent',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, rgba(7, 82, 107, 0.25) 0%, rgba(11, 148, 155, 0.25) 100%)',
    transform: 'translateY(100%)',
    transition: 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 28px rgba(79, 172, 254, 0.3)',
    color: 'white',
    '&:before': {
      transform: 'translateY(0)',
    },
  },
  '&:active': {
    background: 'linear-gradient(90deg, rgba(7, 82, 107, 0.25) 0%, rgba(11, 148, 155, 0.25) 100%)',
    transform: 'translateY(0) scale(0.96)',
  },
}));

const NavButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  justifyContent: 'space-between',
  left: '50%',
  width: '40%',
  transform: 'translateX(-50%)',
  alignItems: 'center',
  gap: theme.spacing(4),
  padding: theme.spacing(1, 3),
  borderRadius: '16px',
  height: '100%',
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  height: '100%',
  color: theme.palette.common.white,
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 2),
  minWidth: 'auto',
  position: 'relative',
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  background: 'rgba(255, 75, 75, 0.2)',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, rgba(255, 75, 75, 0.4) 0%, rgba(255, 50, 50, 0.6) 100%)',
    transform: 'translateY(100%)',
    transition: 'transform 0.4s cubic-bezier(0.65, 0, 0.35, 1)',
    zIndex: -1,
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 28px rgba(255, 75, 75, 0.4)',
    color: '#fff',
    background: 'transparent',
    '&:before': {
      transform: 'translateY(0)',
    },
    '& .MuiSvgIcon-root': {
      transform: 'scale(1.1)',
    }
  },
  '&:active': {
    transform: 'translateY(0) scale(0.96)',
    background: 'linear-gradient(90deg, rgba(7, 82, 107, 0.25) 0%, rgba(11, 148, 155, 0.25) 100%)',
  },
  '& .MuiSvgIcon-root': {
    transition: 'transform 0.3s ease',
    fontSize: '1.5rem',
  }
}));

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        minHeight: '70px !important',
      }}>
        <LogoContainer onClick={navigateHome}>
          <LogoIcon src={medicineIcon} alt="Medicine Icon" />
          <LogoText>MediXpress</LogoText>
        </LogoContainer>

        <NavButtonGroup>
          {role === 'CUSTOMER' && (
            <>
              <NavButton active={location.pathname === '/customer/home'} onClick={() => navigate('/customer/home')}>Home</NavButton>
              <NavButton active={location.pathname === '/customer/mycart'} onClick={() => navigate('/customer/mycart')}>My Cart</NavButton>
              <NavButton active={location.pathname === '/customer/myorderhistory'} onClick={() => navigate('/customer/myorderhistory')}>Orders</NavButton>
            </>
          )}

          {role === 'PHARMACY' && (
            <>
              <NavButton active={location.pathname === '/pharmacy/home'} onClick={() => navigate('/pharmacy/home')}>Home</NavButton>
              <NavButton active={location.pathname === '/pharmacy/inventory'} onClick={() => navigate('/pharmacy/inventory')}>Inventory</NavButton>
              <NavButton active={location.pathname === '/pharmacy/orders'} onClick={() => navigate('/pharmacy/orders')}>Orders</NavButton>
            </>
          )}
        </NavButtonGroup>

        <LogoutButton 
          onClick={handleLogout}
          aria-label="Logout"
          title="Log Out"
        >
          <PowerSettingsNewIcon />
        </LogoutButton>
      </Toolbar>
    </GlassAppBar>
  );
};

export default Navbar;
