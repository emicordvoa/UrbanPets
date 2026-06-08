import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { formatCurrency } from '../../utils/currency.js';

const ServiceCard = ({ service, categoryName, onAdd }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'transform .2s, box-shadow .2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 3 } }}>
    <Box sx={{ position: 'relative' }}>
      <CardMedia component="img" height="210" image={service.imagen || 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=900&q=80'} alt={service.titulo} sx={{ objectFit: 'cover' }} />
      <Chip label={categoryName} size="small" sx={{ position: 'absolute', left: 14, top: 14, bgcolor: 'rgba(235,238,213,0.94)', color: 'primary.dark' }} />
    </Box>
    <CardContent sx={{ flex: 1 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1, color: 'text.secondary' }}>
        <ScheduleIcon fontSize="small" />
        <Typography variant="body2">{service.duracion_minutos || 45} min</Typography>
      </Stack>
      <Typography variant="h6" gutterBottom>
        {service.titulo}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ minHeight: 64 }}>
        {service.descripcion}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: 'space-between', px: 2.5, pb: 2.5 }}>
      <Typography variant="h6" color="primary.main">
        {formatCurrency(Number(service.precio) || 0)}
      </Typography>
      <Button size="small" variant="contained" startIcon={<AddShoppingCartIcon />} onClick={() => onAdd(service)}>
        Agregar
      </Button>
    </CardActions>
  </Card>
);

export default ServiceCard;
