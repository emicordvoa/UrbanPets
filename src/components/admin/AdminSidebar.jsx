import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildIcon from '@mui/icons-material/Build';
import CategoryIcon from '@mui/icons-material/Category';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 280;

const menuItems = [
  { label: 'Dashboard', path: '/admin', icon: <DashboardIcon />, exact: true },
  { label: 'Servicios', path: '/admin/servicios', icon: <BuildIcon /> },
  { label: 'Categorías', path: '/admin/categorias', icon: <CategoryIcon /> },
  { label: 'Citas/Pedidos', path: '/admin/citas', icon: <EventNoteIcon /> },
  { label: 'Publicaciones', path: '/admin/publicaciones', icon: <NewspaperIcon /> }
];

const AdminSidebar = () => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        bgcolor: 'primary.main',
        color: '#fff',
        pt: 2
      }
    }}
  >
    <Box sx={{ px: 2, pb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        UrbanPets Admin
      </Typography>
    </Box>
    <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
    <List sx={{ flex: 1 }}>
      {menuItems.map((item) => (
        <ListItemButton
          key={item.path}
          component={RouterLink}
          to={item.path}
          sx={{
            color: '#fff',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
    <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
    <Box sx={{ p: 2 }}>
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
        Panel de administración
      </Typography>
    </Box>
  </Drawer>
);

export default AdminSidebar;
