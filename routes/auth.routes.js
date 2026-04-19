import express from 'express';
import authController from '../controllers/auth.controller.js'

const authRoutes = express.Router();

authRoutes.post('/register', authController);

export default authRoutes;