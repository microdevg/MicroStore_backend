// services/products.service.js
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import db from '../config/db.js';

const productsCollection = collection(db, 'products');

export async function getAllProducts() {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getProductById(id) {
  const productDoc = doc(db, 'products', id);
  const snapshot = await getDoc(productDoc);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  } else {
    return null;
  }
}

export async function createProduct(newProduct) {
  const docRef = await addDoc(productsCollection, newProduct);
  return { id: docRef.id, ...newProduct };
}

export async function deleteProduct(id) {
  const productDoc = doc(db, 'products', id);
  await deleteDoc(productDoc);
}
