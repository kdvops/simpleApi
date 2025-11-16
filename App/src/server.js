import express from 'express';
import router from './routes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', router);

export default app; // ⬅ necesario para testing

// Solo iniciar servidor si no estamos en test
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}
