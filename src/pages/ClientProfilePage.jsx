import React from 'react';
import { Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../providers/AuthProvider.jsx';

const ClientProfilePage = () => {
  const { profile } = useAuth();
  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Mi perfil</Typography>
        <Stack spacing={2}>
          <TextField label="Nombre" value={profile?.nombre || ''} InputProps={{ readOnly: true }} />
          <TextField label="Correo" value={profile?.correo || ''} InputProps={{ readOnly: true }} />
          <TextField label="Rol" value={profile?.rol || 'cliente'} InputProps={{ readOnly: true }} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ClientProfilePage;
