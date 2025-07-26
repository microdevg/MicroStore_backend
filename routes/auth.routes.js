import express from 'express';
const router = express.Router();
import * as authController from '../controllers/auth.controller.js';
import * as authService from '../services/auth.service.js'; // Para el middleware verifyToken

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para obtener el token (login)
router.post('/login', authController.login);

export default router;