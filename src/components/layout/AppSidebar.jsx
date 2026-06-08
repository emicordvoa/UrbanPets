import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link as RouterLink } from 'react-router-dom';

const menuItems = [
  { label: 'Inicio', path: '/', icon: <HomeIcon /> },
  { label: 'Servicios', path: '/servicios', icon: <BusinessCenterIcon /> },
  { label: 'Carrito', path: '/carrito', icon: <ShoppingCartIcon /> },
  { label: 'Contacto', path: '/contacto', icon: <ContactMailIcon /> },
  { label: 'Configuración', path: '/configuracion', icon: <SettingsIcon /> }
];

const AppSidebar = ({ open, onClose }) => (
  <Drawer anchor="left" open={open} onClose={onClose}>
    <List sx={{ width: 240 }}>
      {menuItems.map((item) => (
        <ListItemButton key={item.path} component={RouterLink} to={item.path} onClick={onClose}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  </Drawer>
);

export default AppSidebar;
