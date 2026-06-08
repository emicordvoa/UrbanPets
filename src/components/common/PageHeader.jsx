import React from 'react';
import { Box, Typography } from '@mui/material';

const PageHeader = ({ title, subtitle, action }) => (
  <Box sx={{ mb: 4, textAlign: 'center' }}>
    <Typography variant="h3" component="h1" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, mx: 'auto' }}>
      {subtitle}
    </Typography>
    {action && <Box sx={{ mt: 3 }}>{action}</Box>}
  </Box>
);

export default PageHeader;
