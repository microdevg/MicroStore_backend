import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Para __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data/products.json');

export async function getAllProducts() {
  const data = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(data);
}

export async function getProductById(id) {
  const products = await getAllProducts();
  return products.find(p => p.id === id);
}

export async function createProduct(newProduct) {
  const products = await getAllProducts();
  products.push(newProduct);
  await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
}

export async function deleteProduct(id) {
  const products = await getAllProducts();
  const updated = products.filter(p => p.id !== id);
  await fs.writeFile(dataPath, JSON.stringify(updated, null, 2));
}
