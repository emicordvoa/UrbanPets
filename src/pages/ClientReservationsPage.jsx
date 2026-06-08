import React from 'react';
import { Alert, Card, CardContent, Typography } from '@mui/material';

const ClientReservationsPage = () => (
  <Card>
    <CardContent sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Mis reservas</Typography>
      <Alert severity="info">Estructura lista para mostrar historial de pedidos enlazados al cliente autenticado.</Alert>
    </CardContent>
  </Card>
);

export default ClientReservationsPage;
