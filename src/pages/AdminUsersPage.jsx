import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import { actualizarUsuario, crearUsuario, eliminarUsuario, obtenerUsuarios } from '../services/admin.js';

const roles = ['administrador', 'trabajador', 'cliente'];
const emptyUser = {
  nombre: '',
  correo: '',
  telefono: '',
  contrasena: '',
  rol: 'cliente',
  activo: true
};

const AdminUsersPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [newUser, setNewUser] = useState(emptyUser);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });

  const cargar = async () => {
    const { data, error } = await obtenerUsuarios();
    if (error) {
      setSnackbar({ open: true, message: 'No se pudieron cargar usuarios', type: 'error' });
      setUsuarios([]);
      return;
    }
    setUsuarios(data || []);
    setDrafts(
      (data || []).reduce((acc, usuario) => {
        acc[usuario.id] = {
          nombre: usuario.nombre || '',
          correo: usuario.correo || '',
          telefono: usuario.telefono || '',
          contrasena: usuario.contrasena || '',
          rol: usuario.rol || 'cliente',
          activo: usuario.activo !== false
        };
        return acc;
      }, {})
    );
  };

  useEffect(() => {
    cargar();
  }, []);

  const updateDraft = (usuarioId, field, value) => {
    setDrafts((prev) => ({
      ...prev,
      [usuarioId]: {
        ...prev[usuarioId],
        [field]: value
      }
    }));
  };

  const saveUser = async (usuarioId) => {
    const { error } = await actualizarUsuario(usuarioId, drafts[usuarioId]);
    if (error) {
      setSnackbar({ open: true, message: 'No se pudo actualizar el usuario', type: 'error' });
      return;
    }
    setSnackbar({ open: true, message: 'Usuario actualizado', type: 'success' });
    cargar();
  };

  const createUser = async () => {
    if (!newUser.nombre || !newUser.correo || !newUser.contrasena) {
      setSnackbar({ open: true, message: 'Nombre, correo y contrasena son obligatorios', type: 'error' });
      return;
    }
    const { error } = await crearUsuario(newUser);
    if (error) {
      setSnackbar({ open: true, message: error.message || 'No se pudo crear el usuario', type: 'error' });
      return;
    }
    setNewUser(emptyUser);
    setSnackbar({ open: true, message: 'Usuario creado', type: 'success' });
    cargar();
  };

  const deleteUser = async (usuarioId) => {
    const { error } = await eliminarUsuario(usuarioId);
    if (error) {
      setSnackbar({ open: true, message: 'No se pudo eliminar el usuario', type: 'error' });
      return;
    }
    setSnackbar({ open: true, message: 'Usuario eliminado', type: 'success' });
    cargar();
  };

  return (
    <AdminLayout>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="overline" color="secondary.main">Usuarios y roles</Typography>
        <Typography variant="h4">Usuarios</Typography>
        <Typography color="text.secondary">
          Login academico basado en la tabla usuarios. Las contrasenas se guardan visibles solo para esta demo.
        </Typography>
      </Stack>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Crear usuario</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={2.2}>
              <TextField label="Nombre" size="small" value={newUser.nombre} onChange={(event) => setNewUser({ ...newUser, nombre: event.target.value })} fullWidth />
            </Grid>
            <Grid item xs={12} md={2.4}>
              <TextField label="Correo" size="small" value={newUser.correo} onChange={(event) => setNewUser({ ...newUser, correo: event.target.value })} fullWidth />
            </Grid>
            <Grid item xs={12} md={1.8}>
              <TextField label="Telefono" size="small" value={newUser.telefono} onChange={(event) => setNewUser({ ...newUser, telefono: event.target.value })} fullWidth />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField label="Contrasena" size="small" value={newUser.contrasena} onChange={(event) => setNewUser({ ...newUser, contrasena: event.target.value })} fullWidth />
            </Grid>
            <Grid item xs={12} md={1.6}>
              <FormControl size="small" fullWidth>
                <Select value={newUser.rol} onChange={(event) => setNewUser({ ...newUser, rol: event.target.value })}>
                  {roles.map((rol) => <MenuItem key={rol} value={rol}>{rol}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button fullWidth startIcon={<PersonAddIcon />} variant="contained" onClick={createUser}>
                Crear
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Correo</TableCell>
                  <TableCell>Telefono</TableCell>
                  <TableCell>Contrasena</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Activo</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell sx={{ minWidth: 170 }}>
                      <TextField size="small" value={drafts[usuario.id]?.nombre || ''} onChange={(event) => updateDraft(usuario.id, 'nombre', event.target.value)} fullWidth />
                    </TableCell>
                    <TableCell sx={{ minWidth: 210 }}>
                      <TextField size="small" value={drafts[usuario.id]?.correo || ''} onChange={(event) => updateDraft(usuario.id, 'correo', event.target.value)} fullWidth />
                    </TableCell>
                    <TableCell sx={{ minWidth: 145 }}>
                      <TextField size="small" value={drafts[usuario.id]?.telefono || ''} onChange={(event) => updateDraft(usuario.id, 'telefono', event.target.value)} fullWidth />
                    </TableCell>
                    <TableCell sx={{ minWidth: 170 }}>
                      <TextField size="small" value={drafts[usuario.id]?.contrasena || ''} onChange={(event) => updateDraft(usuario.id, 'contrasena', event.target.value)} fullWidth />
                    </TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 155 }}>
                        <Select value={drafts[usuario.id]?.rol || 'cliente'} onChange={(event) => updateDraft(usuario.id, 'rol', event.target.value)}>
                          {roles.map((rol) => <MenuItem key={rol} value={rol}>{rol}</MenuItem>)}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Switch checked={drafts[usuario.id]?.activo !== false} onChange={(event) => updateDraft(usuario.id, 'activo', event.target.checked)} />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end" spacing={1}>
                        <Button startIcon={<SaveIcon />} variant="outlined" size="small" onClick={() => saveUser(usuario.id)}>
                          Guardar
                        </Button>
                        <Button startIcon={<DeleteIcon />} color="error" size="small" onClick={() => deleteUser(usuario.id)}>
                          Eliminar
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
                {usuarios.length === 0 && (
                  <TableRow><TableCell colSpan={7} align="center">Sin usuarios registrados</TableCell></TableRow>
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
