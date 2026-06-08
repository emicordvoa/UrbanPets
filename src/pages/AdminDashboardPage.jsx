import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import { obtenerEstadisticasAdmin } from '../services/admin.js';
import { formatDate } from '../utils/dates.js';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    setLoading(true);
    const { data, error } = await obtenerEstadisticasAdmin();
    if (error) {
      console.error('Error cargando estadísticas:', error);
    } else {
      setStats(data);
    }
    setLoading(false);
  };

  if (loading) return <AdminLayout><CircularProgress /></AdminLayout>;

  const cards = [
    { title: 'Total Servicios', value: stats?.serviciosCount || 0, color: '#4DB6AC' },
    { title: 'Total Categorías', value: stats?.categoriasCount || 0, color: '#FF7A70' },
    { title: 'Total Pedidos', value: stats?.pedidosCount || 0, color: '#B0C49C' },
    { title: 'Total Clientes', value: stats?.clientesCount || 0, color: '#7A70BA' }
  ];

  return (
    <AdminLayout>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="h3" sx={{ color: card.color, fontWeight: 700 }}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Últimos Pedidos Registrados
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Mascota</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Fecha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats?.ultimosPedidos && stats.ultimosPedidos.length > 0 ? (
                  stats.ultimosPedidos.map((pedido) => (
                    <TableRow key={pedido.id}>
                      <TableCell>{pedido.clientes?.nombre || 'N/A'}</TableCell>
                      <TableCell>{pedido.mascotas?.nombre || 'N/A'}</TableCell>
                      <TableCell>{pedido.estado}</TableCell>
                      <TableCell>{formatDate(pedido.creado_en)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Sin pedidos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
