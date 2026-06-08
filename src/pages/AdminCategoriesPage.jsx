import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar, Alert, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import CategoryFormDialog from '../components/admin/CategoryFormDialog.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import { obtenerCategorias, crearCategoria, actualizarCategoria, eliminarCategoria } from '../services/admin.js';

const AdminCategoriesPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    setLoading(true);
    const { data, error } = await obtenerCategorias();
    if (error) {
      setSnackbar({ open: true, message: 'Error al cargar categorías', type: 'error' });
    } else {
      setCategorias(data || []);
    }
    setLoading(false);
  };

  const handleOpenForm = (category = null) => {
    setSelectedCategory(category);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedCategory(null);
  };

  const handleSave = async (values) => {
    setLoading(true);
    const { error } = selectedCategory
      ? await actualizarCategoria(selectedCategory.id, values)
      : await crearCategoria(values);

    if (error) {
      setSnackbar({ open: true, message: 'Error al guardar', type: 'error' });
    } else {
      setSnackbar({ open: true, message: 'Categoría guardada correctamente', type: 'success' });
      cargarCategorias();
      handleCloseForm();
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await eliminarCategoria(deleteConfirm.id);
    if (error) {
      setSnackbar({ open: true, message: error.message || 'Error al eliminar', type: 'error' });
    } else {
      setSnackbar({ open: true, message: 'Categoría eliminada correctamente', type: 'success' });
      cargarCategorias();
    }
    setDeleteConfirm({ open: false, id: null });
    setLoading(false);
  };

  return (
    <AdminLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Gestionar Categorías
        </Typography>
        <Button variant="contained" onClick={() => handleOpenForm()}>
          + Nueva Categoría
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categorias.length > 0 ? (
                  categorias.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.nombre}</TableCell>
                      <TableCell>{category.descripcion}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" onClick={() => handleOpenForm(category)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setDeleteConfirm({ open: true, id: category.id })}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Sin categorías
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <CategoryFormDialog
        open={formOpen}
        onClose={handleCloseForm}
        onSave={handleSave}
        category={selectedCategory}
        loading={loading}
      />

      <ConfirmDialog
        open={deleteConfirm.open}
        title="Eliminar categoría"
        description="¿Está seguro? No se puede eliminar si tiene servicios asociados."
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

export default AdminCategoriesPage;
