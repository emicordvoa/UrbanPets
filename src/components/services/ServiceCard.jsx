import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Chip, Stack, Typography } from '@mui/material';
import { formatCurrency } from '../../utils/currency.js';

const ServiceCard = ({ service, categoryName, onAdd }) => (
  <Card sx={{ borderRadius: 4, transition: 'transform .2s', '&:hover': { transform: 'translateY(-6px)' } }}>
    <CardMedia component="img" height="180" image={service.imagen} alt={service.titulo} />
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Chip label={categoryName} size="small" color="secondary" />
        <Typography variant="subtitle2" color="text.secondary">
          {service.duracion_minutos} min
        </Typography>
      </Stack>
      <Typography variant="h6" gutterBottom>
        {service.titulo}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ minHeight: 64 }}>
        {service.descripcion}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {formatCurrency(Number(service.precio) || 0)}
      </Typography>
      <Button size="small" variant="contained" onClick={() => onAdd(service)}>
        Solicitar servicio
      </Button>
    </CardActions>
  </Card>
);

export default ServiceCard;
