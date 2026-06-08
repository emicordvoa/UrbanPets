import React from 'react';
import { Drawer, Box, Typography } from '@mui/material';

const CartDrawer = ({ open, onClose, children }) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <Box sx={{ width: 360, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Carrito
      </Typography>
      {children}
    </Box>
  </Drawer>
);

export default CartDrawer;
