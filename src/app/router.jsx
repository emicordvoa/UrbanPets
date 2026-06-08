import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import ServicesPage from '../pages/ServicesPage.jsx';
import CartPage from '../pages/CartPage.jsx';
import OrdersPage from '../pages/OrdersPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import SettingsPage from '../pages/SettingsPage.jsx';
import AdminDashboardPage from '../pages/AdminDashboardPage.jsx';
import AdminServicesPage from '../pages/AdminServicesPage.jsx';
import AdminCategoriesPage from '../pages/AdminCategoriesPage.jsx';
import AdminAppointmentsPage from '../pages/AdminAppointmentsPage.jsx';
import AdminPublicationsPage from '../pages/AdminPublicationsPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/servicios" element={<ServicesPage />} />
    <Route path="/carrito" element={<CartPage />} />
    <Route path="/pedidos" element={<OrdersPage />} />
    <Route path="/contacto" element={<ContactPage />} />
    <Route path="/configuracion" element={<SettingsPage />} />
    <Route path="/admin" element={<AdminDashboardPage />} />
    <Route path="/admin/servicios" element={<AdminServicesPage />} />
    <Route path="/admin/categorias" element={<AdminCategoriesPage />} />
    <Route path="/admin/citas" element={<AdminAppointmentsPage />} />
    <Route path="/admin/publicaciones" element={<AdminPublicationsPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRouter;
