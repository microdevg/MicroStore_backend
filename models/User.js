import bcrypt from 'bcryptjs';

export class User {
  constructor({ username, email, password }) {
    if (!username || typeof username !== 'string' || username.trim() === '') {
      throw new Error('El nombre de usuario es requerido y debe ser una cadena de texto.');
    }
    if (!email || typeof email !== 'string' || !this.isValidEmail(email)) {
      throw new Error('El email es requerido y debe ser válido.');
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      throw new Error('La contraseña es requerida y debe tener al menos 6 caracteres.');
    }

    this.username = username.trim();
    this.email = email.toLowerCase().trim();
    // La contraseña se hasheará antes de ser asignada en un servicio, no directamente aquí
    this.password = password; 
    this.createdAt = new Date().toISOString();
  }

  // Método para validar el formato del email (básico)
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Prepara el objeto para ser guardado en Firestore
  toFirestoreObject() {
    return {
      username: this.username,
      email: this.email,
      password: this.password, // Asegúrate de que esta ya esté hasheada antes de llamar a esto
      createdAt: this.createdAt
    };
  }
}