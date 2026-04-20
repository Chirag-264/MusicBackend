import express, { application } from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from '../routes/auth.routes.js'
import musicRouter from '../routes/music.routes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/music', musicRouter);

export default app;