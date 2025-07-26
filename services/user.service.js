import db from '../config/db.js';
import { collection, getDocs, getDoc, addDoc, doc, query, where } from 'firebase/firestore';
import bcrypt from 'bcryptjs'; // Importa bcryptjs para hashear contraseñas
import { User } from '../models/User.js'; // Importa el modelo de usuario

// Referencia a la colección 'users'
const usersCollection = collection(db, 'users');

/**
 * Obtener todos los usuarios (quizás no necesario para un sistema de autenticación)
 */
export async function getAllUsers() {
  const snapshot = await getDocs(usersCollection);
  const users = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return users;
}

/**
 * Obtener usuario por ID (Firestore ID aleatorio)
 */
export async function getUserById(id) {
  const userDoc = doc(db, 'users', id);
  const snapshot = await getDoc(userDoc);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

/**
 * Obtener usuario por nombre de usuario
 */
export async function getUserByUsername(username) {
  const q = query(usersCollection, where('username', '==', username));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return null;
  }
  const userDoc = snapshot.docs[0];
  return { id: userDoc.id, ...userDoc.data() };
}


export async function getUserByEmail(email) {
  const q = query(usersCollection, where('email', '==', email));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return null;
  }
  const userDoc = snapshot.docs[0];
  return { id: userDoc.id, ...userDoc.data() };
}

export async function registerUser(userData) {
  const { username, email, password } = userData;

  // Primero, verifica si ya existe un usuario con el mismo username o email
  const existingUserByUsername = await getUserByUsername(username);
  if (existingUserByUsername) {
    throw new Error('El nombre de usuario ya está en uso.');
  }

  const existingUserByEmail = await getUserByEmail(email);
  if (existingUserByEmail) {
    throw new Error('El email ya está registrado.');
  }

  const hashedPassword = await bcrypt.hash(password, 10); // El 10 es el "salt rounds"

  const newUser = new User({ username, email, password: hashedPassword });

  const docRef = await addDoc(usersCollection, newUser.toFirestoreObject());
  return { id: docRef.id, ...newUser.toFirestoreObject() };
}