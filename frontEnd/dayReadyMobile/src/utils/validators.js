// Validaciones de formularios. Se copian las mismas reglas que ya usa el
// backend en backend/src/utils/auth/validationsUsersUtils.js y
// validationsCustomersUtils.js, para avisarle al estudiante el error antes
// de mandar la petición (evita viajes de red innecesarios y mensajes de
// error confusos si el backend rechaza el dato).
export function validateEmail(email) {
  if (!email || !email.trim()) return "El correo es obligatorio.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) return "El formato del correo no es válido.";
  return null;
}

export function validatePassword(password) {
  if (!password) return "La contraseña es obligatoria.";
  if (password.length < 8) return "Debe tener al menos 8 caracteres.";
  if (!/[A-Z]/.test(password)) return "Debe incluir al menos una mayúscula.";
  if (!/[0-9]/.test(password)) return "Debe incluir al menos un número.";
  if (!/[^a-zA-Z0-9]/.test(password)) return "Debe incluir al menos un carácter especial.";
  return null;
}

export function validateName(value, fieldName = "Este campo") {
  if (!value || !value.trim()) return `${fieldName} es obligatorio.`;
  if (value.trim().length < 2) return `${fieldName} debe tener al menos 2 caracteres.`;
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) return `${fieldName} sólo puede tener letras.`;
  return null;
}

export function validateCarnet(carnet) {
  if (!carnet || !carnet.trim()) return "El carnet es obligatorio.";
  if (carnet.trim().length < 3) return "El carnet debe tener al menos 3 caracteres.";
  if (!/^[a-zA-Z0-9-]+$/.test(carnet.trim())) return "El carnet sólo puede tener letras, números o guiones.";
  return null;
}

export function validateVerificationCode(code) {
  if (!code || code.trim().length !== 6) return "El código debe tener 6 caracteres.";
  return null;
}

export function validatePhone(phone) {
  if (!phone || !phone.trim()) return "El teléfono es obligatorio.";
  if (!/^[0-9-\s+]{7,15}$/.test(phone.trim())) return "El teléfono no es válido.";
  return null;
}
