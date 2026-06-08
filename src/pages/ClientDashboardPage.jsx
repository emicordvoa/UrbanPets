import React from 'react';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider.jsx';

const ClientDashboardPage = () => {
  const { profile } = useAuth();
  return (
    <Stack spacing={3}>
      <Card sx={{ bgcolor: 'primary.dark', color: '#fff' }}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="overline" sx={{ color: '#EBEED5' }}>Zona cliente</Typography>
          <Typography variant="h3">Hola, {profile?.nombre || 'cliente'}</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.76)' }}>Gestiona tus datos, mascotas y reservas de UrbanPets.</Typography>
        </CardContent>
      </Card>
      <Grid container spacing={3}>
        {[
          { title: 'Mi perfil', icon: <PersonIcon />, to: '/cliente/perfil' },
          { title: 'Mis mascotas', icon: <PetsIcon />, to: '/cliente/mascotas' },
          { title: 'Mis reservas', icon: <ReceiptLongIcon />, to: '/cliente/reservas' }
        ].map((item) => (
          <Grid item xs={12} md={4} key={item.title}>
            <Card><CardContent><Stack spacing={2}><Typography color="primary.main">{item.icon}</Typography><Typography variant="h5">{item.title}</Typography><Button component={RouterLink} to={item.to} variant="outlined">Abrir</Button></Stack></CardContent></Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default ClientDashboardPage;
