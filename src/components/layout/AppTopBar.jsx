import React from 'react';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PetsIcon from '@mui/icons-material/Pets';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ThemeModeToggle from './ThemeModeToggle.jsx';
import { useUrbanPets } from '../../providers/UrbanPetsProvider.jsx';
import { useAuth } from '../../providers/AuthProvider.jsx';

const navItems = [
  { label: 'Inicio', to: '/', icon: <HomeIcon /> },
  { label: 'Servicios', to: '/servicios', icon: <BusinessCenterIcon /> },
  { label: 'Contacto', to: '/contacto', icon: <ContactMailIcon /> },
  { label: 'Ajustes', to: '/configuracion', icon: <SettingsIcon /> }
];

const AppTopBar = () => {
  const { state } = useUrbanPets();
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const compact = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const panelPath =
    profile?.rol === 'administrador'
      ? '/admin'
      : profile?.rol === 'trabajador'
        ? '/trabajador'
        : profile?.rol === 'cliente'
          ? '/cliente'
          : '/login';

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'rgba(255,255,255,0.84)',
        color: 'text.primary',
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(65,56,107,0.10)'
      }}
    >
      <Toolbar sx={{ minHeight: 76, justifyContent: 'space-between', gap: 2 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.2, color: 'inherit', textDecoration: 'none' }}>
          <Box sx={{ width: 42, height: 42, borderRadius: '14px', display: 'grid', placeItems: 'center', bgcolor: 'primary.main', color: '#fff' }}>
            <PetsIcon />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: 800 }}>
              UrbanPets
            </Typography>
            {!compact && (
              <Typography variant="caption" color="text.secondary">
                Pet care boutique
              </Typography>
            )}
          </Box>
        </Box>

        {!compact && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {navItems.map((item) => (
              <Button key={item.to} startIcon={item.icon} component={RouterLink} to={item.to} color="inherit">
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button startIcon={<CalendarMonthIcon />} component={RouterLink} to="/servicios" variant="contained" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            Agendar cita
          </Button>
          <IconButton component={RouterLink} to="/carrito" color="primary" aria-label="Carrito">
            <Badge badgeContent={cartCount} color="success">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Button startIcon={<LoginIcon />} component={RouterLink} to={panelPath} variant="outlined" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            {profile ? 'Mi panel' : 'Iniciar sesion'}
          </Button>
          {profile && (
            <IconButton
              color="primary"
              aria-label="Cerrar sesion"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              <LogoutIcon />
            </IconButton>
          )}
          <ThemeModeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
