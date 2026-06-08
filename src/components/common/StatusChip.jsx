import React from 'react';
import { Chip } from '@mui/material';

const StatusChip = ({ label, variant = 'filled' }) => (
  <Chip label={label} color="secondary" variant={variant} />
);

export default StatusChip;
