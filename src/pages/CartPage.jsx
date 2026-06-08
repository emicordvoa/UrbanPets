import React, { useState } from 'react';
import { Alert, Avatar, Box, Button, Card, CardContent, Divider, Grid, IconButton, Paper, Snackbar, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useUrbanPets } from '../providers/UrbanPetsProvider.jsx';
import { calculateCartItemSubtotal, calculateCartTotal } from '../utils/cart.js';
import { formatCurrency } from '../utils/currency.js';
import CheckoutDialog from '../components/cart/CheckoutDialog.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

const CartPage = () => {
  const { state, dispatch, actionTypes } = useUrbanPets();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const total = calculateCartTotal(state.cart);

  const handleQuantity = (id, quantity) => {
    dispatch({ type: actionTypes.updateCartItemQuantity, payload: { id, quantity } });
  };

  return (
    <Box>
      <Paper sx={{ p: { xs: 3, md: 5 }, mb: 4, bgcolor: 'primary.dark', color: '#fff' }}>
        <Typography variant="overline" sx={{ color: '#EBEED5' }}>
          Reserva flexible
        </Typography>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Tu carrito de servicios
        </Typography>
        <Typography sx={{ maxWidth: 720, color: 'rgba(255,255,255,0.78)' }}>
          Agrega servicios sin iniciar sesion. Al confirmar, puedes continuar como invitado o usar tu cuenta de cliente.
        </Typography>
      </Paper>

      {state.cart.length === 0 ? (
        <EmptyState title="Tu carrito esta vacio" description="Selecciona servicios y agregalos para iniciar la reserva." actionLabel="Ver servicios" actionTo="/servicios" />
      ) : (
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              {state.cart.map((item) => (
                <Card key={item.id} sx={{ overflow: 'hidden' }}>
                  <CardContent>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between">
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                        <Avatar src={item.imagen} variant="rounded" sx={{ width: 74, height: 74, bgcolor: 'secondary.light' }}>
                          <ShoppingBagIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6">{item.titulo}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatCurrency(item.precio)} por servicio
                          </Typography>
                          <Typography variant="body2" color="primary.main" sx={{ fontWeight: 700 }}>
                            Subtotal {formatCurrency(calculateCartItemSubtotal(item))}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton onClick={() => handleQuantity(item.id, item.quantity - 1)} aria-label="Restar">
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ minWidth: 28, textAlign: 'center', fontWeight: 800 }}>{item.quantity}</Typography>
                        <IconButton onClick={() => handleQuantity(item.id, item.quantity + 1)} aria-label="Sumar">
                          <AddIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => dispatch({ type: actionTypes.removeFromCart, payload: item.id })} aria-label="Eliminar">
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
            <Card sx={{ position: { md: 'sticky' }, top: { md: 96 }, boxShadow: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Resumen
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={1.2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Servicios</Typography>
                    <Typography>{state.cart.length}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Modalidad</Typography>
                    <Typography>Invitado o cliente</Typography>
                  </Stack>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h4" color="primary.main">{formatCurrency(total)}</Typography>
                </Stack>
                <Button fullWidth variant="contained" size="large" onClick={() => setCheckoutOpen(true)}>
                  Continuar reserva
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <CheckoutDialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)} onSuccess={() => setSuccessOpen(true)} />
      <Snackbar open={successOpen} autoHideDuration={5000} onClose={() => setSuccessOpen(false)}>
        <Alert severity="success" variant="filled">Tu solicitud fue registrada correctamente. UrbanPets se comunicara contigo para confirmar la cita.</Alert>
      </Snackbar>
    </Box>
  );
};

export default CartPage;
