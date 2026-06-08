import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUrbanPets } from '../providers/UrbanPetsProvider.jsx';
import { calculateCartItemSubtotal, calculateCartTotal } from '../utils/cart.js';
import { formatCurrency } from '../utils/currency.js';
import CheckoutDialog from '../components/cart/CheckoutDialog.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

const CartPage = () => {
  const { state, dispatch, actionTypes } = useUrbanPets();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleQuantity = (id, quantity) => {
    dispatch({ type: actionTypes.updateCartItemQuantity, payload: { id, quantity } });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Tu carrito de servicios
      </Typography>
      {state.cart.length === 0 ? (
        <EmptyState
          title="Tu carrito está vacío"
          description="Selecciona servicios y agrégalos para iniciar la reserva." 
          actionLabel="Ver servicios"
          actionTo="/servicios"
        />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              {state.cart.map((item) => (
                <Card key={item.id} sx={{ borderRadius: 4 }}>
                  <CardContent>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">{item.titulo}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Precio unitario: {formatCurrency(item.precio)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Subtotal: {formatCurrency(calculateCartItemSubtotal(item))}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton onClick={() => handleQuantity(item.id, item.quantity - 1)}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton onClick={() => handleQuantity(item.id, item.quantity + 1)}>
                          <AddIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => dispatch({ type: actionTypes.removeFromCart, payload: item.id })}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 4, p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Total
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                {formatCurrency(calculateCartTotal(state.cart))}
              </Typography>
              <Button fullWidth variant="contained" onClick={() => setCheckoutOpen(true)}>
                Confirmar pedido
              </Button>
            </Card>
          </Grid>
        </Grid>
      )}
      <CheckoutDialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={() => window.alert('Tu solicitud fue registrada correctamente. UrbanPets se comunicará contigo para confirmar la cita.')}
      />
    </Box>
  );
};

export default CartPage;
