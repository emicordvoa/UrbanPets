import React, { useMemo, useState } from 'react';
import { Alert, Box, Fade, Snackbar, Typography } from '@mui/material';
import { useUrbanPets } from '../providers/UrbanPetsProvider.jsx';
import SearchField from '../components/common/SearchField.jsx';
import ServiceFilters from '../components/services/ServiceFilters.jsx';
import ServiceGrid from '../components/services/ServiceGrid.jsx';

const ServicesPage = () => {
  const { state, dispatch, actionTypes } = useUrbanPets();
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const filteredServices = useMemo(() => {
    return state.servicios
      .filter((service) => !categoryId || service.categoria_id === categoryId)
      .filter((service) => service.titulo.toLowerCase().includes(search.toLowerCase()));
  }, [state.servicios, categoryId, search]);

  const handleAddToCart = (service) => {
    dispatch({ type: actionTypes.addToCart, payload: service });
    setSnackbarOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Explora nuestros servicios para mascotas
      </Typography>
      <SearchField value={search} onChange={(event) => setSearch(event.target.value)} />
      <ServiceFilters
        categoryId={categoryId}
        categories={state.categorias}
        onCategoryChange={(event) => setCategoryId(event.target.value)}
        onReset={() => {
          setCategoryId('');
          setSearch('');
        }}
      />
      {state.loading && <Alert severity="info">Cargando servicios...</Alert>}
      {state.error && <Alert severity="error" sx={{ mb: 3 }}>{state.error}</Alert>}
      <Fade in={!state.loading} timeout={500}>
        <div>
          {filteredServices.length === 0 ? (
            <Alert severity="warning">No se encontraron servicios con esos filtros.</Alert>
          ) : (
            <ServiceGrid services={filteredServices} categories={state.categorias} onAdd={handleAddToCart} />
          )}
        </div>
      </Fade>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Servicio agregado al carrito"
      />
    </Box>
  );
};

export default ServicesPage;
