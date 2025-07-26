import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as userService from './user.service.js'; // Importa los servicios de usuario
import dotenv from 'dotenv'; // Importa dotenv

dotenv.config(); // Carga las variables de entorno al inicio

// Generar un token de acceso JWT
const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

// Generar un token de refresco JWT (opcional)
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
};

// Lógica de inicio de sesión
export const loginUser = async (usernameOrEmail, password) => {
    let user;
    // Intenta buscar por username
    user = await userService.getUserByUsername(usernameOrEmail);

    // Si no se encuentra por username, intenta buscar por email
    if (!user) {
        user = await userService.getUserByEmail(usernameOrEmail);
    }

    if (!user) {
        throw new Error('Credenciales inválidas: Usuario no encontrado.');
    }

    // Compara la contraseña proporcionada con la contraseña hasheada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Credenciales inválidas: Contraseña incorrecta.');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user); // Si implementas refresh tokens

    return { accessToken, refreshToken };
};

// Middleware para verificar el token de acceso
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Espera un formato "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado: Token no proporcionado.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Error al verificar token:', err.message);
            return res.status(403).json({ message: 'Acceso denegado: Token inválido o expirado.' });
        }
        // Adjunta la información del usuario decodificada al objeto de solicitud
        req.user = user; 
        next();
    });
};