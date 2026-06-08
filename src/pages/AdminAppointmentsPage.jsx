import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar, Alert, Typography, MenuItem, Select, FormControl } from '@mui/material';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import AppointmentDetailDialog from '../components/admin/AppointmentDetailDialog.jsx';
import { obtenerPedidosConDetalle, actualizarEstadoPedido } from '../services/admin.js';
import { formatDate } from '../utils/dates.js';
import { formatCurrency } from '../utils/currency.js';

const AdminAppointmentsPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);

  const estadosDisponibles = ['pendiente', 'confirmado', 'cancelado', 'atendido'];

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    setLoading(true);
    const { data, error } = await obtenerPedidosConDetalle();
    if (error) {
      setSnackbar({ open: true, message: 'Error al cargar pedidos', type: 'error' });
    } else {
      setPedidos(data || []);
    }
    setLoading(false);
  };

  const handleVerDetalle = (pedido) => {
    setSelectedPedido(pedido);
    setDetailOpen(true);
  };

  const handleChangeEstado = async (pedidoId, nuevoEstado) => {
    setLoading(true);
    const { error } = await actualizarEstadoPedido(pedidoId, nuevoEstado);
    if (error) {
      setSnackbar({ open: true, message: 'Error al actualizar estado', type: 'error' });
    } else {
      setSnackbar({ open: true, message: 'Estado actualizado', type: 'success' });
      cargarPedidos();
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Gestionar Citas/Pedidos
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Mascota</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Hora</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pedidos.length > 0 ? (
                  pedidos.map((pedido) => (
                    <TableRow key={pedido.id}>
                      <TableCell>{pedido.clientes?.nombre || 'N/A'}</TableCell>
                      <TableCell>{pedido.mascotas?.nombre || 'N/A'}</TableCell>
                      <TableCell>{formatDate(pedido.fecha_preferida)}</TableCell>
                      <TableCell>{pedido.hora_preferida}</TableCell>
                      <TableCell align="right">{formatCurrency(pedido.total)}</TableCell>
                      <TableCell>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                          <Select
                            value={pedido.estado}
                            onChange={(e) => handleChangeEstado(pedido.id, e.target.value)}
                            disabled={loading}
                          >
                            {estadosDisponibles.map((estado) => (
                              <MenuItem key={estado} value={estado}>
                                {estado.charAt(0).toUpperCase() + estado.slice(1)}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">
                        <Button size="small" onClick={() => handleVerDetalle(pedido)}>
                          Ver detalle
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Sin pedidos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <AppointmentDetailDialog open={detailOpen} onClose={() => setDetailOpen(false)} appointment={selectedPedido} />

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.type}>{snackbar.message}</Alert>
      </Snackbar>
    </AdminLayout>
  );
};

export default AdminAppointmentsPage;
