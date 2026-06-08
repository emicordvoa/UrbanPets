import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { calculateCartTotal } from '../../utils/cart.js';
import { formatCurrency } from '../../utils/currency.js';

const CartSummary = ({ items, onCheckout }) => {
  const total = calculateCartTotal(items);
  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Resumen del pedido
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle1">Total general</Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {formatCurrency(total)}
      </Typography>
      <Button fullWidth variant="contained" onClick={onCheckout} disabled={items.length === 0}>
        Confirmar pedido
      </Button>
    </Box>
  );
};

export default CartSummary;
