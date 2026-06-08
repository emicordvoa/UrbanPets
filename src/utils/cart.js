export const calculateCartItemSubtotal = (item) => item.quantity * item.precio;

export const calculateCartTotal = (items) =>
  items.reduce((total, item) => total + calculateCartItemSubtotal(item), 0);

export const normalizeCartItem = (service) => ({
  id: service.id,
  titulo: service.titulo,
  precio: service.precio,
  imagen: service.imagen || '',
  cantidad: service.cantidad || 1,
  quantity: service.quantity || 1
});
