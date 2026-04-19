import express, { application } from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.cookieParser());

export default app;