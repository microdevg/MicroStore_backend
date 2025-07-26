import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct
} from '../services/products.service.js';

export async function getAll(req, res) {
  const products = await getAllProducts();
  res.json(products);
}

export async function getById(req, res) {
  const product = await getProductById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
}

export async function create(req, res) {
  const {  name, price } = req.body;
  if ( !name || !price) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  await createProduct({  name, price });
  res.status(201).json({ message: 'Producto creado' });
}

export async function remove(req, res) {
  await deleteProduct(req.params.id);
  res.status(200).json({ message: 'Producto eliminado' });
}