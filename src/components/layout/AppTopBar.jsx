import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PetsIcon from '@mui/icons-material/Pets';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link as RouterLink } from 'react-router-dom';
import ThemeModeToggle from './ThemeModeToggle.jsx';

const AppTopBar = () => (
  <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
    <Toolbar sx={{ justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PetsIcon color="primary" />
        <Typography component={RouterLink} to="/" variant="h6" sx={{ color: 'text.primary', fontWeight: 700, textDecoration: 'none' }}>
          UrbanPets
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <Button startIcon={<HomeIcon />} component={RouterLink} to="/">
          Inicio
        </Button>
        <Button startIcon={<BusinessCenterIcon />} component={RouterLink} to="/servicios">
          Servicios
        </Button>
        <Button startIcon={<ShoppingCartIcon />} component={RouterLink} to="/carrito">
          Carrito
        </Button>
        <Button startIcon={<ContactMailIcon />} component={RouterLink} to="/contacto">
          Contacto
        </Button>
        <Button startIcon={<SettingsIcon />} component={RouterLink} to="/configuracion">
          Configuración
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ThemeModeToggle />
      </Box>
    </Toolbar>
  </AppBar>
);

export default AppTopBar;
