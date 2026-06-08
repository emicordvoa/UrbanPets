import React, { useState } from 'react';
import { Alert, Box, Button, Grid, Paper, Snackbar, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection.jsx';
import BenefitsSection from '../components/home/BenefitsSection.jsx';
import TestimonialsSection from '../components/home/TestimonialsSection.jsx';
import ServiceCard from '../components/services/ServiceCard.jsx';
import { useUrbanPets } from '../providers/UrbanPetsProvider.jsx';

const HomePage = () => {
  const navigate = useNavigate();
  const { state, dispatch, actionTypes } = useUrbanPets();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const featuredServices = state.servicios.slice(0, 4);

  const handleAddToCart = (service) => {
    dispatch({ type: actionTypes.addToCart, payload: service });
    setSnackbarOpen(true);
  };

  return (
    <Box>
      <HeroSection />
      <Box sx={{ mt: 8 }}>
        <BenefitsSection />
      </Box>
      <Box sx={{ mt: 8, mb: 4 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'flex-end' }} spacing={2} sx={{ mb: 3 }}>
          <Box>
            <Typography variant="overline" color="secondary.main">
              Catalogo boutique
            </Typography>
            <Typography variant="h3">Servicios destacados</Typography>
          </Box>
          <Button variant="outlined" onClick={() => navigate('/servicios')}>
            Ver catalogo completo
          </Button>
        </Stack>
        <Grid container spacing={3}>
          {featuredServices.map((service) => (
            <Grid item xs={12} sm={6} md={3} key={service.id}>
              <ServiceCard service={service} categoryName="Destacado" onAdd={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <TestimonialsSection />
      <Paper sx={{ mt: 8, p: { xs: 4, md: 6 }, borderRadius: 3, textAlign: 'center', bgcolor: 'primary.dark', color: '#fff' }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Tu mascota merece una experiencia segura, comoda y feliz.
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.75)', mb: 3 }}>
          Reserva en minutos y deja que UrbanPets organice el cuidado con detalle.
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate('/servicios')} sx={{ bgcolor: '#EBEED5', color: 'primary.dark', '&:hover': { bgcolor: '#fff' } }}>
          Reservar servicio
        </Button>
      </Paper>
      <Snackbar open={snackbarOpen} autoHideDuration={2600} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success" variant="filled">Servicio agregado al carrito</Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
