import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar, Alert, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import PublicationFormDialog from '../components/admin/PublicationFormDialog.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import { obtenerPublicaciones, crearPublicacion, actualizarPublicacion, eliminarPublicacion } from '../services/admin.js';

const AdminPublicationsPage = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const cargarPublicaciones = async () => {
    setLoading(true);
    const { data, error } = await obtenerPublicaciones(true);
    if (error) {
      setSnackbar({ open: true, message: 'Error al cargar publicaciones', type: 'error' });
    } else {
      setPublicaciones(data || []);
    }
    setLoading(false);
  };

  const handleOpenForm = (publication = null) => {
    setSelectedPublication(publication);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedPublication(null);
  };

  const handleSave = async (values) => {
    setLoading(true);
    const { error } = selectedPublication
      ? await actualizarPublicacion(selectedPublication.id, values)
      : await crearPublicacion(values);

    if (error) {
      setSnackbar({ open: true, message: 'Error al guardar', type: 'error' });
    } else {
      setSnackbar({ open: true, message: 'Publicación guardada correctamente', type: 'success' });
      cargarPublicaciones();
      handleCloseForm();
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await eliminarPublicacion(deleteConfirm.id);
    if (error) {
      setSnackbar({ open: true, message: 'Error al eliminar', type: 'error' });
    } else {
      setSnackbar({ open: true, message: 'Publicación eliminada correctamente', type: 'success' });
      cargarPublicaciones();
    }
    setDeleteConfirm({ open: false, id: null });
    setLoading(false);
  };

  return (
    <AdminLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Gestionar Publicaciones
        </Typography>
        <Button variant="contained" onClick={() => handleOpenForm()}>
          + Nueva Publicación
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Activo</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {publicaciones.length > 0 ? (
                  publicaciones.map((pub) => (
                    <TableRow key={pub.id}>
                      <TableCell>{pub.titulo}</TableCell>
                      <TableCell>{pub.tipo}</TableCell>
                      <TableCell>{pub.activo ? 'Sí' : 'No'}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" onClick={() => handleOpenForm(pub)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setDeleteConfirm({ open: true, id: pub.id })}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Sin publicaciones
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <PublicationFormDialog
        open={formOpen}
        onClose={handleCloseForm}
        onSave={handleSave}
        publication={selectedPublication}
        loading={loading}
      />

      <ConfirmDialog
        open={deleteConfirm.open}
        title="Eliminar publicación"
        description="¿Está seguro de que desea eliminar esta publicación?"
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

export default AdminPublicationsPage;
