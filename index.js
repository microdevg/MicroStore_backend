import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js'
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());

app.use('/auth', authRoutes);


app.use('/products',productRoutes);


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
