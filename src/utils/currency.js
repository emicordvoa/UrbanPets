export const formatCurrency = (value, currency = 'BOB') => {
  if (typeof value !== 'number') {
    return value;
  }
  return new Intl.NumberFormat('es-BO', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(value);
};
