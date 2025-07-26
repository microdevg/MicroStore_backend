# MicroStore Backend

## Descripción
Backend de una aplicación de e-commerce que gestiona un CRUD de productos con autenticación JWT. Permite a usuarios registrados crear y eliminar productos, asegurando el acceso a rutas sensibles. Construido con Node.js y Firestore.

## Características
- **Autenticación JWT:** Registro, inicio de sesión y protección de rutas.
- **Gestión de Productos:** Crear, listar, obtener por ID y eliminar.
- **Base de Datos:** Firestore.

## Tecnologías
- Node.js, Express.js
- Firebase / Firestore
- JSON Web Tokens (JWT)
- Bcrypt.js
- Dotenv

## Estructura del Proyecto

```
MicroStore_backend/
├── config/
├── controllers/
├── models/
├── routes/
├── services/
├── .env
├── app.js
└── package.json
```



### Clona el repositorio:
```bash
#git clone 
https://github.com/microdevg/MicroStore_backend.git
cd MicroStore_backend
npm install
npm run start
```