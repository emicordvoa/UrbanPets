import React, { useEffect, useState } from 'react';
import { Alert, Card, CardContent, FormControl, MenuItem, Select, Snackbar, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import { actualizarPerfil, obtenerPerfiles } from '../services/admin.js';

const roles = ['administrador', 'trabajador', 'cliente'];

const AdminUsersPage = () => {
  const [perfiles, setPerfiles] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });

  const cargar = async () => {
    const { data, error } = await obtenerPerfiles();
    if (error) setSnackbar({ open: true, message: 'No se pudieron cargar perfiles', type: 'error' });
    setPerfiles(data || []);
  };

  useEffect(() => {
    cargar();
  }, []);

  const update = async (perfil, updates) => {
    const { error } = await actualizarPerfil(perfil.id, updates);
    if (error) {
      setSnackbar({ open: true, message: 'No se pudo actualizar el perfil', type: 'error' });
      return;
    }
    setSnackbar({ open: true, message: 'Perfil actualizado', type: 'success' });
    cargar();
  };

  return (
    <AdminLayout>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="overline" color="secondary.main">Roles y acceso</Typography>
        <Typography variant="h4">Usuarios</Typography>
      </Stack>
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Correo</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Activo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {perfiles.map((perfil) => (
                  <TableRow key={perfil.id}>
                    <TableCell>{perfil.nombre}</TableCell>
                    <TableCell>{perfil.correo}</TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 180 }}>
                        <Select value={perfil.rol || 'cliente'} onChange={(event) => update(perfil, { rol: event.target.value })}>
                          {roles.map((rol) => <MenuItem key={rol} value={rol}>{rol}</MenuItem>)}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell><Switch checked={perfil.activo !== false} onChange={(event) => update(perfil, { activo: event.target.checked })} /></TableCell>
                  </TableRow>
                ))}
                {perfiles.length === 0 && (
                  <TableRow><TableCell colSpan={4} align="center">Sin perfiles registrados</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.type}>{snackbar.message}</Alert>
      </Snackbar>
    </AdminLayout>
  );
};

export default AdminUsersPage;
