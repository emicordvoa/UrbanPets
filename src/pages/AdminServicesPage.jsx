import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar, Alert, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import ServiceFormDialog from '../components/admin/ServiceFormDialog.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import { obtenerServicios, obtenerCategorias, crearServicio, actualizarServicio, eliminarODesactivarServicio } from '../services/admin.js';
import { formatCurrency } from '../utils/currency.js';

const AdminServicesPage = () => {
  const [servicios, setServicios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    const [{ data: serviciosData }, { data: categoriasData }] = await Promise.all([
      obtenerServicios(),
      obtenerCategorias()
    ]);
    setServicios(serviciosData || []);
    setCategorias(categoriasData || []);
    setLoading(false);
  };

  const handleOpenForm = (service = null) => {
    setSelectedService(service);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedService(null);
  };

  const handleSave = async (values) => {
    setLoading(true);
    const { error } = selectedService
      ? await actualizarServicio(selectedService.id, values)
      : await crearServicio(values);

    if (error) {
      setSnackbar({ open: true, message: 'Error al guardar', type: 'error' });
    } else {
      setSnackbar({ open: true, message: 'Servicio guardado correctamente', type: 'success' });
      cargarDatos();
      handleCloseForm();
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await eliminarODesactivarServicio(deleteConfirm.id);
    if (error) {
      setSnackbar({ open: true, message: 'Error al eliminar', type: 'error' });
    } else {
      setSnackbar({ open: true, message: 'Servicio eliminado o desactivado', type: 'success' });
      cargarDatos();
    }
    setDeleteConfirm({ open: false, id: null });
    setLoading(false);
  };

  const getCategoryName = (categoryId) => {
    return categorias.find((c) => c.id === categoryId)?.nombre || 'N/A';
  };

  return (
    <AdminLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Gestionar Servicios
        </Typography>
        <Button variant="contained" onClick={() => handleOpenForm()}>
          + Nuevo Servicio
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="right">Duración</TableCell>
                  <TableCell>Activo</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {servicios.length > 0 ? (
                  servicios.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>{service.titulo}</TableCell>
                      <TableCell>{getCategoryName(service.categoria_id)}</TableCell>
                      <TableCell align="right">{formatCurrency(service.precio)}</TableCell>
                      <TableCell align="right">{service.duracion_minutos} min</TableCell>
                      <TableCell>{service.activo ? 'Sí' : 'No'}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" onClick={() => handleOpenForm(service)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setDeleteConfirm({ open: true, id: service.id })}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Sin servicios
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <ServiceFormDialog
        open={formOpen}
        onClose={handleCloseForm}
        onSave={handleSave}
        service={selectedService}
        categories={categorias}
        loading={loading}
      />

      <ConfirmDialog
        open={deleteConfirm.open}
        title="Eliminar servicio"
        description="¿Está seguro? Si el servicio tiene pedidos asociados, será desactivado en lugar de eliminado."
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={handleDelete}
        confirmLabel="Eliminar"
      />

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.type}>{snackbar.message}</Alert>
      </Snackbar>
    </AdminLayout>
  );
};

export default AdminServicesPage;
