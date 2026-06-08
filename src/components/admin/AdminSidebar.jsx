import React from 'react';
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildIcon from '@mui/icons-material/Build';
import CategoryIcon from '@mui/icons-material/Category';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider.jsx';

const drawerWidth = 280;

const menuItems = [
  { label: 'Dashboard', path: '/admin', icon: <DashboardIcon />, roles: ['administrador'] },
  { label: 'Servicios', path: '/admin/servicios', icon: <BuildIcon />, roles: ['administrador'] },
  { label: 'Categorias', path: '/admin/categorias', icon: <CategoryIcon />, roles: ['administrador'] },
  { label: 'Citas/Pedidos', path: '/admin/citas', icon: <EventNoteIcon />, roles: ['administrador'] },
  { label: 'Publicaciones', path: '/admin/publicaciones', icon: <NewspaperIcon />, roles: ['administrador'] },
  { label: 'Usuarios', path: '/admin/usuarios', icon: <PeopleIcon />, roles: ['administrador'] },
  { label: 'Clientes', path: '/admin/clientes', icon: <PeopleIcon />, roles: ['administrador'] },
  { label: 'Mascotas', path: '/admin/mascotas', icon: <PetsIcon />, roles: ['administrador'] },
  { label: 'Citas', path: '/trabajador/citas', icon: <EventNoteIcon />, roles: ['trabajador'] },
  { label: 'Clientes', path: '/trabajador/clientes', icon: <PeopleIcon />, roles: ['trabajador'] },
  { label: 'Mascotas', path: '/trabajador/mascotas', icon: <PetsIcon />, roles: ['trabajador'] }
];

const AdminSidebar = () => {
  const { profile } = useAuth();
  const role = profile?.rol || 'administrador';
  const visibleItems = menuItems.filter((item) => item.roles.includes(role));

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'primary.dark',
          color: '#fff',
          pt: 2,
          borderRight: 0
        }
      }}
    >
      <Box sx={{ px: 2, pb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          UrbanPets {role === 'trabajador' ? 'Trabajo' : 'Admin'}
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.68)' }}>
          {profile?.nombre || 'Modo demo'}
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.14)' }} />
      <List sx={{ flex: 1, px: 1 }}>
        {visibleItems.map((item) => (
          <ListItemButton key={item.path} component={RouterLink} to={item.path} sx={{ color: '#fff', borderRadius: 2, my: 0.5, '&:hover': { bgcolor: 'rgba(255,255,255,0.10)' } }}>
            <ListItemIcon sx={{ color: '#EBEED5' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.14)' }} />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Panel con roles de usuarios
        </Typography>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
