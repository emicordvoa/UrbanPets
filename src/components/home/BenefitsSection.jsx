import React from 'react';
import { Avatar, Grid, Paper, Stack, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const benefits = [
  { title: 'Atencion personalizada', subtitle: 'Planes segun tamano, raza, energia y necesidades de tu mascota.', icon: <FavoriteIcon /> },
  { title: 'Agenda facil y rapida', subtitle: 'Elige servicios, fecha y hora desde una experiencia clara.', icon: <EventAvailableIcon /> },
  { title: 'Cuidado profesional', subtitle: 'Equipo orientado a bienestar, estetica y trato responsable.', icon: <WorkspacePremiumIcon /> },
  { title: 'Seguimiento cercano', subtitle: 'Estados de cita, historial y recordatorios listos para crecer.', icon: <NotificationsActiveIcon /> }
];

const BenefitsSection = () => (
  <section>
    <Stack spacing={1} sx={{ mb: 3 }}>
      <Typography variant="overline" color="secondary.main">
        Experiencia premium
      </Typography>
      <Typography variant="h3">Bienestar con orden y carino</Typography>
    </Stack>
    <Grid container spacing={3}>
      {benefits.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.title}>
          <Paper elevation={1} sx={{ p: 3, minHeight: 220, borderRadius: 3, transition: 'transform .2s, box-shadow .2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 3 } }}>
            <Avatar sx={{ bgcolor: 'primary.light', color: '#fff', mb: 2 }}>{item.icon}</Avatar>
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
