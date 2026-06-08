import React from 'react';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import { Navigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider.jsx';

const AccessDenied = ({ roles }) => (
  <Box sx={{ py: 8, textAlign: 'center' }}>
    <Typography variant="h3" sx={{ mb: 2 }}>
      Acceso restringido
    </Typography>
    <Alert severity="warning" sx={{ maxWidth: 620, mx: 'auto', mb: 3 }}>
      Tu rol actual no tiene permiso para entrar a esta seccion. Roles permitidos: {roles.join(', ')}.
    </Alert>
    <Button component={RouterLink} to="/" variant="contained">
      Volver al inicio
    </Button>
  </Box>
);

const ProtectedRoute = ({ children, roles = [] }) => {
  const { loading, isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box sx={{ minHeight: 360, display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!user || user.activo === false) {
    return <AccessDenied roles={roles.length ? roles : ['usuario activo']} />;
  }

  if (user.rol === 'administrador') {
    return children;
  }

  if (roles.length > 0 && !roles.includes(user.rol)) {
    return <AccessDenied roles={roles} />;
  }

  return children;
};

export default ProtectedRoute;
