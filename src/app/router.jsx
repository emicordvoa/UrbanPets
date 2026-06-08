import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import ServicesPage from '../pages/ServicesPage.jsx';
import CartPage from '../pages/CartPage.jsx';
import OrdersPage from '../pages/OrdersPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import SettingsPage from '../pages/SettingsPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

const AppRouter = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/servicios" element={<ServicesPage />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/pedidos" element={<OrdersPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/configuracion" element={<SettingsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);

export default AppRouter;
