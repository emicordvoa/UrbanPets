export const fallbackCategories = [
  { id: 'cat-1', nombre: 'Peluquería', descripcion: 'Cortes, baños y estilismo profesional' },
  { id: 'cat-2', nombre: 'Spa', descripcion: 'Hidroterapia y cuidados especiales' },
  { id: 'cat-3', nombre: 'Guardería', descripcion: 'Cuidado de día con diversión' },
  { id: 'cat-4', nombre: 'Hotel', descripcion: 'Estadías seguras y confortables' }
];

export const fallbackServices = [
  {
    id: 'srv-1',
    categoria_id: 'cat-1',
    titulo: 'Corte y baño premium',
    descripcion: 'Limpieza profunda, secado y corte personalizado.',
    precio: 120,
    duracion_minutos: 90,
    imagen: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=800&q=80',
    activo: true
  },
  {
    id: 'srv-2',
    categoria_id: 'cat-1',
    titulo: 'Baño hidratante',
    descripcion: 'Champú suave y acondicionador nutritivo para piel sensible.',
    precio: 80,
    duracion_minutos: 45,
    imagen: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
    activo: true
  },
  {
    id: 'srv-3',
    categoria_id: 'cat-2',
    titulo: 'Spa relajante',
    descripcion: 'Aromaterapia, masaje y cepillado para un día de spa.',
    precio: 160,
    duracion_minutos: 120,
    imagen: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=800&q=80',
    activo: true
  },
  {
    id: 'srv-4',
    categoria_id: 'cat-3',
    titulo: 'Guardería por día',
    descripcion: 'Juegos, socialización y paseo dentro del servicio.',
    precio: 90,
    duracion_minutos: 480,
    imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    activo: true
  },
  {
    id: 'srv-5',
    categoria_id: 'cat-4',
    titulo: 'Hotel de lujo',
    descripcion: 'Habitación individual, atención 24/7 y alimentación balanceada.',
    precio: 220,
    duracion_minutos: 1440,
    imagen: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80',
    activo: true
  },
  {
    id: 'srv-6',
    categoria_id: 'cat-2',
    titulo: 'Cuidado de patas',
    descripcion: 'Corte de uñas, limpieza y crema protectora.',
    precio: 55,
    duracion_minutos: 30,
    imagen: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab7?auto=format&fit=crop&w=800&q=80',
    activo: true
  }
];
