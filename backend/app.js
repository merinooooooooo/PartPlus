import express from 'express';
import cookieParser from "cookie-parser";
import clientesRoutes from './src/routes/clientes.js';
import reservasRoutes from './src/routes/reserva.js';

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/clientes", clientesRoutes);
app.use('/api', reservasRoutes);

export default app;