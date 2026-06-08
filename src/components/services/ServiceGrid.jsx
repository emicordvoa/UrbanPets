import React from 'react';
import { Grid } from '@mui/material';
import ServiceCard from './ServiceCard.jsx';

const ServiceGrid = ({ services, categories, onAdd }) => (
  <Grid container spacing={3}>
    {services.map((service) => {
      const category = categories.find((item) => item.id === service.categoria_id);
      return (
        <Grid item xs={12} sm={6} md={4} key={service.id}>
          <ServiceCard service={service} categoryName={category?.nombre || 'Servicio'} onAdd={onAdd} />
        </Grid>
      );
    })}
  </Grid>
);

export default ServiceGrid;
