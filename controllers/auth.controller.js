import * as authService from '../services/auth.service.js';
import * as userService from '../services/user.service.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Se requiere nombre de usuario/email y contraseña.' });
    }

    try {
        const { accessToken, refreshToken } = await authService.loginUser(email, password);
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Se requieren nombre de usuario, email y contraseña.' });
    }

    try {
        const newUser = await userService.registerUser({ username, email, password });
        res.status(201).json({ message: 'Usuario registrado exitosamente.', user: { id: newUser.id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const protectedRoute = (req, res) => {
    res.status(200).json({ message: `Bienvenido, ${req.user.username}! Acceso concedido a la ruta protegida.`, user: req.user });
};