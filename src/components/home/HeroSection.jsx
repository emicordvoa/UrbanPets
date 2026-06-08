import React from 'react';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection = () => (
  <Card sx={{ bgcolor: '#FFFBF2', borderRadius: 4, boxShadow: 0, mb: 6 }}>
    <CardContent>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Estética canina profesional, a un clic de distancia.
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Agenda baños, cortes, spa, hotel y guardería para tu mascota de forma rápida, segura y sencilla.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button component={RouterLink} to="/servicios" variant="contained" size="large">
              Ver servicios
            </Button>
            <Button component={RouterLink} to="/carrito" variant="outlined" size="large">
              Agendar ahora
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ width: '100%', height: 360, bgcolor: '#FFF0F4', borderRadius: 4, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h5" color="text.secondary">
              UrbanPets es tu mejor aliado para el bienestar de tu mascota en Cochabamba.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default HeroSection;
