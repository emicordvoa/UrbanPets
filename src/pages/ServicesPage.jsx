import React, { useMemo, useState } from 'react';
import { Alert, Box, Fade, Paper, Snackbar, Stack, Typography } from '@mui/material';
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
      .filter((service) => service.activo !== false)
      .filter((service) => !categoryId || service.categoria_id === categoryId)
      .filter((service) => `${service.titulo} ${service.descripcion}`.toLowerCase().includes(search.toLowerCase()));
  }, [state.servicios, categoryId, search]);

  const handleAddToCart = (service) => {
    dispatch({ type: actionTypes.addToCart, payload: service });
    setSnackbarOpen(true);
  };

  return (
    <Box>
      <Paper sx={{ p: { xs: 3, md: 5 }, mb: 4, bgcolor: 'primary.dark', color: '#fff' }}>
        <Typography variant="overline" sx={{ color: '#EBEED5' }}>
          Catalogo UrbanPets
        </Typography>
        <Typography variant="h3" sx={{ maxWidth: 780, mb: 1 }}>
          Servicios profesionales para cada rutina de cuidado.
        </Typography>
        <Typography sx={{ maxWidth: 720, color: 'rgba(255,255,255,0.78)' }}>
          Filtra por categoria, compara duracion y precio, y agrega servicios al carrito sin iniciar sesion.
        </Typography>
      </Paper>
      <Stack spacing={2} sx={{ mb: 4 }}>
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
      </Stack>
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
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success" variant="filled">Servicio agregado al carrito</Alert>
      </Snackbar>
    </Box>
  );
};

export default ServicesPage;
