import React, { useState } from 'react';
import { Alert, Box, Button, Card, CardContent, Divider, Stack, TextField, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider.jsx';

const roleHome = {
  administrador: '/admin',
  trabajador: '/trabajador',
  cliente: '/cliente'
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [values, setValues] = useState({ correo: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const { data, error: loginError } = await login(values);
    if (loginError) {
      setError(loginError.message === 'Credenciales invalidas' ? 'Credenciales inválidas' : loginError.message || 'No se pudo iniciar sesion.');
      setLoading(false);
      return;
    }
    const loggedUser = data?.user;
    navigate(roleHome[loggedUser?.rol] || '/cliente', { replace: true });
  };

  return (
    <Box sx={{ minHeight: 620, display: 'grid', placeItems: 'center', py: 4 }}>
      <Card sx={{ width: '100%', maxWidth: 460, boxShadow: 3 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="overline" color="secondary.main">
              Acceso UrbanPets
            </Typography>
            <Typography variant="h4">Iniciar sesion</Typography>
            <Typography color="text.secondary">
              Entra como administrador, trabajador o cliente segun tu perfil de Supabase.
            </Typography>
          </Stack>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField label="Correo" type="email" value={values.correo} onChange={handleChange('correo')} fullWidth required />
              <TextField label="Contrasena" type="password" value={values.password} onChange={handleChange('password')} fullWidth required />
              <Button type="submit" variant="contained" size="large" startIcon={<LoginIcon />} disabled={loading}>
                Entrar
              </Button>
            </Stack>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Button component={RouterLink} to="/registro" fullWidth variant="outlined">
            Crear cuenta de cliente
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
