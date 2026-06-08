import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Link as RouterLink } from 'react-router-dom';

const EmptyState = ({ title, description, actionLabel, actionTo }) => (
  <Box sx={{ textAlign: 'center', py: 10 }}>
    <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: 'primary.main' }} />
    <Typography variant="h5" sx={{ mt: 2, fontWeight: 700 }}>
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
      {description}
    </Typography>
    {actionTo && (
      <Button component={RouterLink} to={actionTo} variant="contained" color="primary">
        {actionLabel}
      </Button>
    )}
  </Box>
);

export default EmptyState;
