import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';

const ServiceFormDialog = ({ open, onClose, onSave, service, categories, loading }) => {
  const [values, setValues] = useState({
    titulo: '',
    descripcion: '',
    precio: 0,
    duracion_minutos: 30,
    imagen: '',
    categoria_id: '',
    activo: true
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (service) {
      setValues(service);
    } else {
      setValues({
        titulo: '',
        descripcion: '',
        precio: 0,
        duracion_minutos: 30,
        imagen: '',
        categoria_id: '',
        activo: true
      });
    }
    setErrors({});
  }, [open, service]);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.titulo) newErrors.titulo = 'Requerido';
    if (!values.descripcion) newErrors.descripcion = 'Requerido';
    if (values.precio < 0) newErrors.precio = 'Debe ser >= 0';
    if (!values.categoria_id) newErrors.categoria_id = 'Requerido';
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
      <DialogTitle>{service ? 'Editar servicio' : 'Nuevo servicio'}</DialogTitle>
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="Precio (Bs)"
              type="number"
              value={values.precio}
              onChange={handleChange('precio')}
              fullWidth
              error={!!errors.precio}
              helperText={errors.precio}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Duración (min)"
              type="number"
              value={values.duracion_minutos}
              onChange={handleChange('duracion_minutos')}
              fullWidth
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
            <FormControl fullWidth error={!!errors.categoria_id}>
              <InputLabel>Categoría</InputLabel>
              <Select
                label="Categoría"
                value={values.categoria_id}
                onChange={handleChange('categoria_id')}
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.nombre}
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
          {service ? 'Guardar' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceFormDialog;
