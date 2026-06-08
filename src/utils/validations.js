export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateCustomerForm = (values) => {
  const errors = {};
  if (!values.nombre) errors.nombre = 'El nombre es obligatorio.';
  if (!values.correo) {
    errors.correo = 'El correo es obligatorio.';
  } else if (!isValidEmail(values.correo)) {
    errors.correo = 'Ingrese un correo válido.';
  }
  if (!values.telefono) errors.telefono = 'El teléfono es obligatorio.';
  if (!values.nombreMascota) errors.nombreMascota = 'El nombre de la mascota es obligatorio.';
  if (!values.fechaPreferida) errors.fechaPreferida = 'La fecha preferida es obligatoria.';
  if (!values.horaPreferida) errors.horaPreferida = 'La hora preferida es obligatoria.';
  return errors;
};

export const validateContactForm = (values) => {
  const errors = {};
  if (!values.nombre) errors.nombre = 'El nombre es obligatorio.';
  if (!values.correo) {
    errors.correo = 'El correo es obligatorio.';
  } else if (!isValidEmail(values.correo)) {
    errors.correo = 'Ingrese un correo válido.';
  }
  if (!values.mensaje) {
    errors.mensaje = 'El mensaje es obligatorio.';
  } else if (values.mensaje.length < 10) {
    errors.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
  }
  return errors;
};
