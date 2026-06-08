import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage = () => (
  <Box sx={{ textAlign: 'center', py: 12 }}>
    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
      404
    </Typography>
    <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
      Página no encontrada. Regresa al inicio para explorar los servicios.
    </Typography>
    <Button component={RouterLink} to="/" variant="contained">
      Volver al inicio
    </Button>
  </Box>
);

export default NotFoundPage;
