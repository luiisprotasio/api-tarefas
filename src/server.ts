import express from 'express';
import { tasksApp } from './routes/TarefaRoutes.js';
const app = express();
const PORT = 1412;
app.use(express.json()); 
app.use('/tasks', tasksApp);
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});