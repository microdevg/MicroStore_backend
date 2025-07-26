import express from 'express';
import * as productController from '../controllers/products.controller.js'; 
import * as authService from '../services/auth.service.js';

const router = express.Router();

router.get('/', productController.getAll); // Obtener todos los productos
router.get('/:id', productController.getById); // Obtener un producto por ID


router.post('/', authService.verifyToken, productController.create);

router.delete('/:id', authService.verifyToken, productController.remove);

export default router;