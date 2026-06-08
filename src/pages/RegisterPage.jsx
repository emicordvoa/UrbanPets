import React, { useState } from 'react';
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider.jsx';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [values, setValues] = useState({ nombre: '', correo: '', telefono: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const { error: registerError } = await register(values);
    if (registerError) {
      setError(registerError.message || 'No se pudo crear la cuenta.');
      setLoading(false);
      return;
    }
    navigate('/cliente', { replace: true });
  };

  return (
    <Box sx={{ minHeight: 620, display: 'grid', placeItems: 'center', py: 4 }}>
      <Card sx={{ width: '100%', maxWidth: 500, boxShadow: 3 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography variant="overline" color="secondary.main">
            Registro de cliente
          </Typography>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Crea tu cuenta
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Podras ver tus reservas y reutilizar tus datos en futuros checkouts.
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField label="Nombre completo" value={values.nombre} onChange={handleChange('nombre')} fullWidth required />
              <TextField label="Correo" type="email" value={values.correo} onChange={handleChange('correo')} fullWidth required />
              <TextField label="Telefono" value={values.telefono} onChange={handleChange('telefono')} fullWidth required />
              <TextField label="Contrasena" type="password" value={values.password} onChange={handleChange('password')} fullWidth required />
              <Button type="submit" variant="contained" size="large" startIcon={<PersonAddIcon />} disabled={loading}>
                Crear cuenta
              </Button>
              <Button component={RouterLink} to="/login" variant="text">
                Ya tengo cuenta
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;
