import React from 'react';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PetsIcon from '@mui/icons-material/Pets';
import PeopleIcon from '@mui/icons-material/People';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import { Link as RouterLink } from 'react-router-dom';

const WorkerDashboardPage = () => (
  <AdminLayout>
    <Stack spacing={1} sx={{ mb: 3 }}>
      <Typography variant="overline" color="secondary.main">Panel operativo</Typography>
      <Typography variant="h4">Trabajador</Typography>
      <Typography color="text.secondary">Acceso limitado a citas, clientes y mascotas.</Typography>
    </Stack>
    <Grid container spacing={3}>
      {[
        { title: 'Citas del dia', icon: <EventNoteIcon />, to: '/trabajador/citas' },
        { title: 'Clientes', icon: <PeopleIcon />, to: '/trabajador/clientes' },
        { title: 'Mascotas', icon: <PetsIcon />, to: '/trabajador/mascotas' }
      ].map((item) => (
        <Grid item xs={12} md={4} key={item.title}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography color="primary.main">{item.icon}</Typography>
                <Typography variant="h5">{item.title}</Typography>
                <Button component={RouterLink} to={item.to} variant="contained">Abrir</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </AdminLayout>
);

export default WorkerDashboardPage;
