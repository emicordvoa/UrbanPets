import React from 'react';
import { Grid, Paper, Typography, Avatar, Stack } from '@mui/material';

const testimonials = [
  { mascota: 'Luna', comentario: 'Mi perrita quedó hermosa y muy feliz con el spa. Volveremos cada mes.', cliente: 'Sofía' },
  { mascota: 'Simba', comentario: 'Excelente atención y ambiente cálido. Se nota que aman a los animales.', cliente: 'Andrés' },
  { mascota: 'Mia', comentario: 'El hotel es súper seguro y mi mascota volvió tranquila y bien cuidada.', cliente: 'Valeria' }
];

const TestimonialsSection = () => (
  <section>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
      Clientes felices
    </Typography>
    <Grid container spacing={3}>
      {testimonials.map((item) => (
        <Grid item xs={12} md={4} key={item.mascota}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 4, minHeight: 200 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Avatar>{item.mascota.charAt(0)}</Avatar>
              <div>
                <Typography variant="subtitle1" fontWeight={700}>
                  {item.mascota}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.cliente}
                </Typography>
              </div>
            </Stack>
            <Typography color="text.secondary">“{item.comentario}”</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </section>
);

export default TestimonialsSection;
