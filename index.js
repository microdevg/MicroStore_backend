import express from 'express';
import dotenv from 'dotenv';
// --- 1. IMPORTA path y fileURLToPath ---
import path from 'path';
import { fileURLToPath } from 'url';

import productRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js'

dotenv.config();

// --- 2. CONFIGURA __dirname (necesario en ES Modules) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// --- 3. USA EL MIDDLEWARE para servir archivos estáticos desde la carpeta 'public' ---
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Tus rutas de API existentes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// No necesitas un app.get('/') para el index.html, express.static lo maneja por ti.

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});