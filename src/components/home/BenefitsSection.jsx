import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const benefits = [
  { title: 'Atención personalizada', subtitle: 'Planes hechos a la medida del tamaño, raza y carácter de tu mascota.' },
  { title: 'Agenda 24/7', subtitle: 'Reserva cuando quieras y recibe confirmación rápida.' },
  { title: 'Cuidado profesional', subtitle: 'Equipo especializado en bienestar animal y estética canina.' },
  { title: 'Recordatorios de citas', subtitle: 'Te ayudamos a recordar la fecha y hora de tu servicio.' }
];

const BenefitsSection = () => (
  <section>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
      Beneficios para tu mascota
    </Typography>
    <Grid container spacing={3}>
      {benefits.map((item) => (
        <Grid item xs={12} sm={6} key={item.title}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 4, minHeight: 160, transition: 'transform .2s', '&:hover': { transform: 'translateY(-4px)' } }}>
            <Typography variant="h6" gutterBottom>
              {item.title}
            </Typography>
            <Typography color="text.secondary">{item.subtitle}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </section>
);

export default BenefitsSection;
