import React from 'react';
import Typography from '@mui/material/Typography';
import { formatCurrency } from '../../utils/currency.js';

const CurrencyText = ({ value }) => (
  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
    {formatCurrency(Number(value) || 0)}
  </Typography>
);

export default CurrencyText;
