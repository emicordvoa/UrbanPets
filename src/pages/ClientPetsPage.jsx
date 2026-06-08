import React from 'react';
import { Alert, Card, CardContent, Typography } from '@mui/material';

const ClientPetsPage = () => (
  <Card>
    <CardContent sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Mis mascotas</Typography>
      <Alert severity="info">Estructura lista para listar y registrar mascotas del cliente autenticado.</Alert>
    </CardContent>
  </Card>
);

export default ClientPetsPage;
