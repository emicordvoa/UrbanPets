import React, { useEffect, useState } from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack } from '@mui/material';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import { obtenerMascotas } from '../services/admin.js';

const AdminPetsPage = () => {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    obtenerMascotas().then(({ data }) => setMascotas(data || []));
  }, []);

  return (
    <AdminLayout>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="overline" color="secondary.main">Pacientes y huespedes</Typography>
        <Typography variant="h4">Mascotas</Typography>
      </Stack>
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead><TableRow><TableCell>Mascota</TableCell><TableCell>Dueno</TableCell><TableCell>Raza</TableCell><TableCell>Edad</TableCell><TableCell>Peso</TableCell><TableCell>Notas</TableCell></TableRow></TableHead>
              <TableBody>
                {mascotas.map((mascota) => (
                  <TableRow key={mascota.id}>
                    <TableCell>{mascota.nombre}</TableCell>
                    <TableCell>{mascota.clientes?.nombre || 'N/A'}</TableCell>
                    <TableCell>{mascota.raza || 'N/A'}</TableCell>
                    <TableCell>{mascota.edad || 'N/A'}</TableCell>
                    <TableCell>{mascota.peso || 'N/A'}</TableCell>
                    <TableCell>{mascota.notas || 'Sin notas'}</TableCell>
                  </TableRow>
                ))}
                {mascotas.length === 0 && <TableRow><TableCell colSpan={6} align="center">Sin mascotas</TableCell></TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminPetsPage;
