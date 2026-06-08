import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Alert
} from '@mui/material';
import { useUrbanPets } from '../../providers/UrbanPetsProvider.jsx';
import { calculateCartTotal } from '../../utils/cart.js';
import { validateCustomerForm } from '../../utils/validations.js';
import { formatCurrency } from '../../utils/currency.js';
import { supabase } from '../../lib/supabaseClient.js';

const CheckoutDialog = ({ open, onClose, onSuccess }) => {
  const { state, dispatch, actionTypes } = useUrbanPets();
  const [values, setValues] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    nombreMascota: '',
    raza: '',
    edad: '',
    peso: '',
    notas: '',
    fechaPreferida: '',
    horaPreferida: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setValues({
        nombre: '',
        correo: '',
        telefono: '',
        nombreMascota: '',
        raza: '',
        edad: '',
        peso: '',
        notas: '',
        fechaPreferida: '',
        horaPreferida: '',
        mensaje: ''
      });
      setErrors({});
      setSubmissionError('');
      setSubmitting(false);
    }
  }, [open]);

  const handleChange = (key) => (event) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateCustomerForm(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    if (state.cart.length === 0) {
      setSubmissionError('Debes agregar al menos un servicio al carrito.');
      return;
    }

    setSubmitting(true);
    setSubmissionError('');

    try {
      const total = calculateCartTotal(state.cart);
      if (!state.supabaseAvailable) {
        throw new Error('Supabase no disponible');
      }
      const { data: clienteData, error: clienteError } = await supabase
        .from('clientes')
        .insert([{ nombre: values.nombre, correo: values.correo, telefono: values.telefono }])
        .select('id')
        .single();

      if (clienteError || !clienteData) {
        throw clienteError || new Error('Error creando cliente');
      }

      const clienteId = clienteData.id;
      const { data: mascotaData, error: mascotaError } = await supabase
        .from('mascotas')
        .insert([
          {
            cliente_id: clienteId,
            nombre: values.nombreMascota,
            raza: values.raza,
            edad: values.edad,
            peso: values.peso,
            notas: values.notas
          }
        ])
        .select('id')
        .single();

      if (mascotaError || !mascotaData) {
        throw mascotaError || new Error('Error creando mascota');
      }
      const mascotaId = mascotaData.id;

      const { data: pedidoData, error: pedidoError } = await supabase
        .from('pedidos')
        .insert([
          {
            cliente_id: clienteId,
            mascota_id: mascotaId,
            fecha_preferida: values.fechaPreferida,
            hora_preferida: values.horaPreferida,
            mensaje: values.mensaje,
            total,
            estado: 'Pendiente'
          }
        ])
        .select('id')
        .single();

      if (pedidoError || !pedidoData) {
        throw pedidoError || new Error('Error creando pedido');
      }
      const pedidoId = pedidoData.id;

      const detalle = state.cart.map((item) => ({
        pedido_id: pedidoId,
        servicio_id: item.id,
        cantidad: item.quantity,
        precio_unitario: item.precio,
        subtotal: item.quantity * item.precio
      }));

      const { error: detalleError } = await supabase.from('pedido_detalle').insert(detalle);
      if (detalleError) {
        throw detalleError;
      }

      dispatch({ type: actionTypes.clearCart });
      dispatch({ type: actionTypes.setLastOrder, payload: { total, fecha: new Date().toISOString(), cliente: values.nombre } });
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      setSubmissionError('No se pudo registrar el pedido. Verifica tu conexión y vuelve a intentar.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Confirmar servicio</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Completa los datos del cliente, la mascota y la cita para agendar tu servicio.
        </DialogContentText>
        {submissionError && <Alert severity="error" sx={{ mt: 2 }}>{submissionError}</Alert>}
        <Box component="form" sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Datos del cliente
          </Typography>
          <Grid container spacing={2}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Teléfono"
                value={values.telefono}
                onChange={handleChange('telefono')}
                fullWidth
                error={!!errors.telefono}
                helperText={errors.telefono}
              />
            </Grid>
          </Grid>
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
            Datos de la mascota
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre de la mascota"
                value={values.nombreMascota}
                onChange={handleChange('nombreMascota')}
                fullWidth
                error={!!errors.nombreMascota}
                helperText={errors.nombreMascota}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Raza" value={values.raza} onChange={handleChange('raza')} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Edad" value={values.edad} onChange={handleChange('edad')} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Peso" value={values.peso} onChange={handleChange('peso')} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notas especiales"
                value={values.notas}
                onChange={handleChange('notas')}
                fullWidth
                multiline
                minRows={2}
              />
            </Grid>
          </Grid>
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
            Datos de la cita
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha preferida"
                type="date"
                value={values.fechaPreferida}
                onChange={handleChange('fechaPreferida')}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.fechaPreferida}
                helperText={errors.fechaPreferida}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Hora preferida"
                type="time"
                value={values.horaPreferida}
                onChange={handleChange('horaPreferida')}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.horaPreferida}
                helperText={errors.horaPreferida}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mensaje opcional"
                value={values.mensaje}
                onChange={handleChange('mensaje')}
                fullWidth
                multiline
                minRows={3}
              />
            </Grid>
          </Grid>
          <Typography variant="subtitle2" sx={{ mt: 3 }}>
            Total estimado: {formatCurrency(calculateCartTotal(state.cart))}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
          Confirmar pedido
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutDialog;
