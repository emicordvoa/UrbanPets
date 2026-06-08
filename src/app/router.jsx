import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import ServicesPage from '../pages/ServicesPage.jsx';
import CartPage from '../pages/CartPage.jsx';
import OrdersPage from '../pages/OrdersPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import SettingsPage from '../pages/SettingsPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import AdminDashboardPage from '../pages/AdminDashboardPage.jsx';
import AdminServicesPage from '../pages/AdminServicesPage.jsx';
import AdminCategoriesPage from '../pages/AdminCategoriesPage.jsx';
import AdminAppointmentsPage from '../pages/AdminAppointmentsPage.jsx';
import AdminPublicationsPage from '../pages/AdminPublicationsPage.jsx';
import AdminUsersPage from '../pages/AdminUsersPage.jsx';
import AdminClientsPage from '../pages/AdminClientsPage.jsx';
import AdminPetsPage from '../pages/AdminPetsPage.jsx';
import WorkerDashboardPage from '../pages/WorkerDashboardPage.jsx';
import WorkerAppointmentsPage from '../pages/WorkerAppointmentsPage.jsx';
import WorkerClientsPage from '../pages/WorkerClientsPage.jsx';
import WorkerPetsPage from '../pages/WorkerPetsPage.jsx';
import ClientDashboardPage from '../pages/ClientDashboardPage.jsx';
import ClientProfilePage from '../pages/ClientProfilePage.jsx';
import ClientPetsPage from '../pages/ClientPetsPage.jsx';
import ClientReservationsPage from '../pages/ClientReservationsPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import ProtectedRoute from '../components/auth/ProtectedRoute.jsx';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/servicios" element={<ServicesPage />} />
    <Route path="/carrito" element={<CartPage />} />
    <Route path="/pedidos" element={<OrdersPage />} />
    <Route path="/contacto" element={<ContactPage />} />
    <Route path="/configuracion" element={<SettingsPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/registro" element={<RegisterPage />} />
    <Route path="/admin" element={<ProtectedRoute roles={['administrador']}><AdminDashboardPage /></ProtectedRoute>} />
    <Route path="/admin/servicios" element={<ProtectedRoute roles={['administrador']}><AdminServicesPage /></ProtectedRoute>} />
    <Route path="/admin/categorias" element={<ProtectedRoute roles={['administrador']}><AdminCategoriesPage /></ProtectedRoute>} />
    <Route path="/admin/citas" element={<ProtectedRoute roles={['administrador']}><AdminAppointmentsPage /></ProtectedRoute>} />
    <Route path="/admin/publicaciones" element={<ProtectedRoute roles={['administrador']}><AdminPublicationsPage /></ProtectedRoute>} />
    <Route path="/admin/usuarios" element={<ProtectedRoute roles={['administrador']}><AdminUsersPage /></ProtectedRoute>} />
    <Route path="/admin/clientes" element={<ProtectedRoute roles={['administrador']}><AdminClientsPage /></ProtectedRoute>} />
    <Route path="/admin/mascotas" element={<ProtectedRoute roles={['administrador']}><AdminPetsPage /></ProtectedRoute>} />
    <Route path="/trabajador" element={<ProtectedRoute roles={['administrador', 'trabajador']}><WorkerDashboardPage /></ProtectedRoute>} />
    <Route path="/trabajador/citas" element={<ProtectedRoute roles={['administrador', 'trabajador']}><WorkerAppointmentsPage /></ProtectedRoute>} />
    <Route path="/trabajador/clientes" element={<ProtectedRoute roles={['administrador', 'trabajador']}><WorkerClientsPage /></ProtectedRoute>} />
    <Route path="/trabajador/mascotas" element={<ProtectedRoute roles={['administrador', 'trabajador']}><WorkerPetsPage /></ProtectedRoute>} />
    <Route path="/cliente" element={<ProtectedRoute roles={['administrador', 'cliente']}><ClientDashboardPage /></ProtectedRoute>} />
    <Route path="/cliente/perfil" element={<ProtectedRoute roles={['administrador', 'cliente']}><ClientProfilePage /></ProtectedRoute>} />
    <Route path="/cliente/mascotas" element={<ProtectedRoute roles={['administrador', 'cliente']}><ClientPetsPage /></ProtectedRoute>} />
    <Route path="/cliente/reservas" element={<ProtectedRoute roles={['administrador', 'cliente']}><ClientReservationsPage /></ProtectedRoute>} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRouter;
