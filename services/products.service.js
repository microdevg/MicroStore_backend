import db from '../config/db.js';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';

// Referencia a la colección 'products'
const productsCollection = collection(db, 'products');

/**
 * Obtener todos los productos
 */
export async function getAllProducts() {
  const snapshot = await getDocs(productsCollection);
  const products = snapshot.docs.map(doc => ({
    id: doc.id, // incluye el ID generado por Firestore
    ...doc.data()
  }));
  return products;
}

/**
 * Obtener producto por ID (Firestore ID aleatorio)
 */
export async function getProductById(id) {
  const productDoc = doc(db, 'products', id);
  const snapshot = await getDoc(productDoc);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

/**
 * Crear producto (Firestore genera el ID automáticamente)
 */
export async function createProduct(newProduct) {
  const docRef = await addDoc(productsCollection, newProduct);
  return { id: docRef.id, ...newProduct };
}

/**
 * Eliminar producto por ID
 */
export async function deleteProduct(id) {
  const productDoc = doc(db, 'products', id);
  await deleteDoc(productDoc);
}
