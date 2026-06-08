import React from 'react';
import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material';
import { useUrbanPets } from '../providers/UrbanPetsProvider.jsx';

const SettingsPage = () => {
  const { state, dispatch, actionTypes } = useUrbanPets();

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Configuración
      </Typography>
      <Card sx={{ borderRadius: 4, p: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Información del proyecto</Typography>
          <Typography sx={{ mt: 1 }}>UrbanPets es una plataforma de servicios para mascotas en Cochabamba.</Typography>
          <Typography sx={{ mt: 2 }}>Tema actual: {state.themeMode}</Typography>
          <Typography>
            Estado de conexión con Supabase:{' '}
            <Chip label={state.supabaseAvailable ? 'Conectado' : 'Offline / datos de respaldo'} color={state.supabaseAvailable ? 'success' : 'warning'} />
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 4, p: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Acciones</Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            onClick={() => dispatch({ type: actionTypes.clearCart })}
          >
            Limpiar carrito local
          </Button>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 4, p: 3 }}>
        <CardContent>
          <Typography variant="h6">Tecnologías usadas</Typography>
          <Typography sx={{ mt: 1 }}>React, Vite, Material UI, React Router DOM, Supabase, localStorage y GitHub Pages.</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPage;
