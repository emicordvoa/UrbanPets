import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useUrbanPets } from '../providers/UrbanPetsProvider.jsx';
import { formatDateTime } from '../utils/dates.js';

const OrdersPage = () => {
  const { state } = useUrbanPets();
  const lastOrder = state.lastOrder;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Pedidos
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Los pedidos se guardan en Supabase. Aquí verás el último pedido registrado en esta sesión.
      </Typography>
      {lastOrder ? (
        <Paper sx={{ p: 4, borderRadius: 4 }} elevation={2}>
          <Typography variant="h6">Último pedido</Typography>
          <Typography sx={{ mt: 1 }}>Cliente: {lastOrder.cliente}</Typography>
          <Typography>Fecha registrada: {formatDateTime(lastOrder.fecha)}</Typography>
          <Typography>Total: {lastOrder.total ? `${lastOrder.total} BOB` : 'Sin total'}</Typography>
        </Paper>
      ) : (
        <Typography color="text.secondary">Aún no se han registrado pedidos en la sesión actual.</Typography>
      )}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        Para ver todos los pedidos, revisa la tabla <strong>pedidos</strong> en Supabase.
      </Typography>
    </Box>
  );
};

export default OrdersPage;
