import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const PublicationFormDialog = ({ open, onClose, onSave, publication, loading }) => {
  const [values, setValues] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
    tipo: 'promocion',
    activo: true
  });
  const [errors, setErrors] = useState({});

  const tiposPublicacion = [
    { value: 'hero', label: 'Hero (Portada)' },
    { value: 'beneficio', label: 'Beneficio' },
    { value: 'testimonio', label: 'Testimonio' },
    { value: 'promocion', label: 'Promoción' }
  ];

  useEffect(() => {
    if (publication) {
      setValues(publication);
    } else {
      setValues({ titulo: '', descripcion: '', imagen: '', tipo: 'promocion', activo: true });
    }
    setErrors({});
  }, [open, publication]);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.titulo) newErrors.titulo = 'Requerido';
    if (!values.descripcion) newErrors.descripcion = 'Requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(values);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{publication ? 'Editar publicación' : 'Nueva publicación'}</DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Título"
              value={values.titulo}
              onChange={handleChange('titulo')}
              fullWidth
              error={!!errors.titulo}
              helperText={errors.titulo}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              value={values.descripcion}
              onChange={handleChange('descripcion')}
              fullWidth
              multiline
              minRows={3}
              error={!!errors.descripcion}
              helperText={errors.descripcion}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="URL Imagen"
              value={values.imagen}
              onChange={handleChange('imagen')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select label="Tipo" value={values.tipo} onChange={handleChange('tipo')}>
                {tiposPublicacion.map((tipo) => (
                  <MenuItem key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {publication ? 'Guardar' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublicationFormDialog;
