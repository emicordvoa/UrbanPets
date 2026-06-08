import React from 'react';
import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection = () => (
  <Box
    sx={{
      minHeight: { xs: 620, md: 680 },
      display: 'grid',
      alignItems: 'center',
      borderRadius: 0,
      position: 'relative',
      overflow: 'hidden',
      mx: { xs: -2, sm: -3 },
      px: { xs: 2, sm: 4, md: 8 },
      py: { xs: 6, md: 8 },
      color: '#fff',
      backgroundImage:
        'linear-gradient(90deg, rgba(35,25,66,0.92) 0%, rgba(65,56,107,0.82) 48%, rgba(65,56,107,0.25) 100%), url("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1800&q=85")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    <Grid container spacing={5} alignItems="center">
      <Grid item xs={12} md={7}>
        <Stack spacing={3} alignItems="flex-start">
          <Chip icon={<VerifiedIcon />} label="Cuidado profesional en Cochabamba" sx={{ bgcolor: 'rgba(235,238,213,0.92)', color: 'primary.dark', fontWeight: 800 }} />
          <Typography variant="h1" sx={{ maxWidth: 760, fontSize: { xs: 42, md: 68 }, lineHeight: 1.02 }}>
            Cuidado, estetica y bienestar para mascotas urbanas.
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 660, color: 'rgba(255,255,255,0.86)', lineHeight: 1.7 }}>
            Agenda bano, peluqueria, spa, hotel o guarderia para tu mascota de forma rapida, segura y profesional.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button component={RouterLink} to="/servicios" variant="contained" size="large" endIcon={<ArrowForwardIcon />} sx={{ bgcolor: '#EBEED5', color: 'primary.dark', '&:hover': { bgcolor: '#fff' } }}>
              Ver servicios
            </Button>
            <Button component={RouterLink} to="/servicios" variant="outlined" size="large" startIcon={<CalendarMonthIcon />} sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.55)' }}>
              Agendar ahora
            </Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={5}>
        <Box
          sx={{
            ml: { md: 'auto' },
            maxWidth: 420,
            p: 3,
            borderRadius: 4,
            bgcolor: 'rgba(255,255,255,0.14)',
            border: '1px solid rgba(255,255,255,0.24)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <Typography variant="overline" sx={{ color: '#EBEED5' }}>
            Reserva express
          </Typography>
          <Typography variant="h4" sx={{ mb: 1 }}>
            4 pasos simples
          </Typography>
          {['Elige servicios', 'Agrega al carrito', 'Completa datos o inicia sesion', 'Recibe confirmacion'].map((item, index) => (
            <Stack key={item} direction="row" spacing={2} alignItems="center" sx={{ py: 1.2 }}>
              <Box sx={{ width: 34, height: 34, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: index === 0 ? '#B0C49C' : 'rgba(255,255,255,0.18)', fontWeight: 800 }}>
                {index + 1}
              </Box>
              <Typography>{item}</Typography>
            </Stack>
          ))}
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default HeroSection;
