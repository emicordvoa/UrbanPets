import React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection.jsx';
import BenefitsSection from '../components/home/BenefitsSection.jsx';
import TestimonialsSection from '../components/home/TestimonialsSection.jsx';
import ServiceCard from '../components/services/ServiceCard.jsx';
import { useUrbanPets } from '../providers/UrbanPetsProvider.jsx';

const HomePage = () => {
  const navigate = useNavigate();
  const { state } = useUrbanPets();
  const featuredServices = state.servicios.slice(0, 4);

  return (
    <Box>
      <HeroSection />
      <BenefitsSection />
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Servicios destacados
        </Typography>
        <Grid container spacing={3}>
          {featuredServices.map((service) => (
            <Grid item xs={12} sm={6} md={3} key={service.id}>
              <Paper sx={{ p: 2, borderRadius: 4, height: '100%' }} elevation={1}>
                <ServiceCard service={service} categoryName="Destacado" onAdd={() => {}} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <TestimonialsSection />
      <Paper sx={{ mt: 8, p: 4, borderRadius: 4, textAlign: 'center', bgcolor: '#FDF3F4' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Tu mascota merece una experiencia cómoda, segura y feliz.
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate('/servicios')}>
          Reservar servicio
        </Button>
      </Paper>
    </Box>
  );
};

export default HomePage;
