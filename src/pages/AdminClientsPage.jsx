import React, { useEffect, useState } from 'react';
import { Card, CardContent, Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import { obtenerClientes } from '../services/admin.js';

const AdminClientsPage = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    obtenerClientes().then(({ data }) => setClientes(data || []));
  }, []);

  return (
    <AdminLayout>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="overline" color="secondary.main">CRM mascotas</Typography>
        <Typography variant="h4">Clientes</Typography>
      </Stack>
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead><TableRow><TableCell>Cliente</TableCell><TableCell>Correo</TableCell><TableCell>Telefono</TableCell><TableCell>Mascotas</TableCell><TableCell>Pedidos</TableCell></TableRow></TableHead>
              <TableBody>
                {clientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>{cliente.nombre}</TableCell>
                    <TableCell>{cliente.correo}</TableCell>
                    <TableCell>{cliente.telefono}</TableCell>
                    <TableCell><Chip label={cliente.mascotas?.length || 0} color="secondary" /></TableCell>
                    <TableCell><Chip label={cliente.pedidos?.length || 0} color="primary" /></TableCell>
                  </TableRow>
                ))}
                {clientes.length === 0 && <TableRow><TableCell colSpan={5} align="center">Sin clientes</TableCell></TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminClientsPage;
