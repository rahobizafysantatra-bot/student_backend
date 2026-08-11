import express from 'express';
import dotenv from 'dotenv';
import studentRoutes from './routes/student.routes.js';

dotenv.config();

const app = express();
app.use(express.json()); // pour parser le JSON dans req.body

app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});