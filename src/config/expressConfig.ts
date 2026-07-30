import express from 'express';
import { tasksApp } from '../routes/TarefaRoutes';

const app = express();
app.use(express.json());
app.use('/tasks', tasksApp);

export { app };