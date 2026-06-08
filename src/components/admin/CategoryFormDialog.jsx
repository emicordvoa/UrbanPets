import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';

const CategoryFormDialog = ({ open, onClose, onSave, category, loading }) => {
  const [values, setValues] = useState({
    nombre: '',
    descripcion: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (category) {
      setValues(category);
    } else {
      setValues({ nombre: '', descripcion: '' });
    }
    setErrors({});
  }, [open, category]);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.nombre) newErrors.nombre = 'Requerido';
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
      <DialogTitle>{category ? 'Editar categoría' : 'Nueva categoría'}</DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              value={values.nombre}
              onChange={handleChange('nombre')}
              fullWidth
              error={!!errors.nombre}
              helperText={errors.nombre}
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
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {category ? 'Guardar' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryFormDialog;
