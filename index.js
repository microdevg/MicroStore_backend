import express from 'express';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Página inicial');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
