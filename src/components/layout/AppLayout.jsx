import React from 'react';
import { Box, Container } from '@mui/material';
import AppTopBar from './AppTopBar.jsx';

const AppLayout = ({ children }) => (
  <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
    <AppTopBar />
    <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
      {children}
    </Container>
  </Box>
);

export default AppLayout;
