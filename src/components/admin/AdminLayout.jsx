import React from 'react';
import { Box, Container, Alert } from '@mui/material';
import AdminSidebar from './AdminSidebar.jsx';

const AdminLayout = ({ children }) => (
  <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
    <AdminSidebar />
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Alert severity="warning" sx={{ m: 2, borderRadius: 2 }}>
        Acceso demo protegido por usuarios y roles. Revisa las politicas RLS antes de produccion.
      </Alert>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  </Box>
);

export default AdminLayout;
