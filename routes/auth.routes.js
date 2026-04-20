import express from 'express';
import authController from '../controllers/auth.controller.js'

const authRoutes = express.Router();

authRoutes.post('/register', authController.registerUser);
authRoutes.post('/login', authController.loginUser);
authRoutes.post('/logout', authController.logoutUser);


export default authRoutes;