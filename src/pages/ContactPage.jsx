import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Alert } from '@mui/material';
import { validateContactForm } from '../utils/validations.js';

const ContactPage = () => {
  const [values, setValues] = useState({ nombre: '', correo: '', mensaje: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateContactForm(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setSuccess(false);
      return;
    }

    setErrors({});
    setSuccess(true);
    setValues({ nombre: '', correo: '', mensaje: '' });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Contáctanos
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Envíanos un mensaje y te responderemos para ayudarte a agendar el mejor servicio para tu mascota.
      </Typography>
      {success && <Alert severity="success" sx={{ mb: 3 }}>Gracias por escribirnos. Pronto nos comunicaremos contigo.</Alert>}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              value={values.nombre}
              onChange={handleChange('nombre')}
              fullWidth
              error={!!errors.nombre}
              helperText={errors.nombre}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Correo"
              value={values.correo}
              onChange={handleChange('correo')}
              fullWidth
              error={!!errors.correo}
              helperText={errors.correo}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mensaje"
              value={values.mensaje}
              onChange={handleChange('mensaje')}
              fullWidth
              multiline
              minRows={4}
              error={!!errors.mensaje}
              helperText={errors.mensaje}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Enviar mensaje
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactPage;
