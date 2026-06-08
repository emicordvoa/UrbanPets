import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ServiceFilters = ({ categoryId, categories, onCategoryChange, onReset }) => (
  <Box sx={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr auto', alignItems: 'end', mb: 4 }}>
    <FormControl fullWidth>
      <InputLabel>Categoría</InputLabel>
      <Select label="Categoría" value={categoryId} onChange={onCategoryChange}>
        <MenuItem value="">Todas</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Button variant="outlined" onClick={onReset}>
      Limpiar filtro
    </Button>
  </Box>
);

export default ServiceFilters;
