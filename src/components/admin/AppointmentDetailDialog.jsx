import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Divider
} from '@mui/material';
import { formatCurrency } from '../../utils/currency.js';
import { formatDate } from '../../utils/dates.js';

const AppointmentDetailDialog = ({ open, onClose, appointment }) => {
  if (!appointment) return null;

  const { clientes, mascotas, pedido_detalle, ...pedido } = appointment;
  const cliente = clientes || {};
  const mascota = mascotas || {};

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Detalle del Pedido #{pedido.id?.slice(0, 8)}</DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Datos del Cliente
          </Typography>
          <Typography>
            <strong>Nombre:</strong> {cliente.nombre}
          </Typography>
          <Typography>
            <strong>Correo:</strong> {cliente.correo}
          </Typography>
          <Typography>
            <strong>Teléfono:</strong> {cliente.telefono}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Datos de la Mascota
          </Typography>
          <Typography>
            <strong>Nombre:</strong> {mascota.nombre}
          </Typography>
          <Typography>
            <strong>Raza:</strong> {mascota.raza || 'N/A'}
          </Typography>
          <Typography>
            <strong>Edad:</strong> {mascota.edad || 'N/A'}
          </Typography>
          <Typography>
            <strong>Peso:</strong> {mascota.peso || 'N/A'}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Información de la Cita
          </Typography>
          <Typography>
            <strong>Fecha:</strong> {formatDate(pedido.fecha_preferida)}
          </Typography>
          <Typography>
            <strong>Hora:</strong> {pedido.hora_preferida}
          </Typography>
          {pedido.mensaje && (
            <Typography>
              <strong>Mensaje:</strong> {pedido.mensaje}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Servicios Solicitados
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Servicio</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Precio Unitario</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pedido_detalle && pedido_detalle.length > 0 ? (
                  pedido_detalle.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.servicios?.titulo || 'Servicio'}</TableCell>
                      <TableCell align="right">{item.cantidad}</TableCell>
                      <TableCell align="right">{formatCurrency(item.precio_unitario)}</TableCell>
                      <TableCell align="right">{formatCurrency(item.subtotal)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Sin servicios
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="h6">
            <strong>Total:</strong> {formatCurrency(pedido.total)}
          </Typography>
          <Typography>
            <strong>Estado:</strong> {pedido.estado}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentDetailDialog;
