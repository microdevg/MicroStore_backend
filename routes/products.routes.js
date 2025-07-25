import express from 'express';
import {
  getAll,
  getById,
  create,
  remove
} from '../controllers/products.controller.js';

const router = express.Router();

router.get('/api/products', getAll);
router.get('/api/products/:id', getById);
router.post('/api/products/create', create);
router.delete('/api/products/:id', remove);

export default router;