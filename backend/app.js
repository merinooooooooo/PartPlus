import express from 'express';
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser";
import clientesRoutes from './src/routes/clientes.js';
import reservasRoutes from './src/routes/reserva.js';

const app = express();

app.use(express.json());

app.use(cookieParser());

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.resolve("./ricaldone-76f-PartPlus-1.0.0-resolved.json"), "utf-8")
);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/clientes", clientesRoutes);
app.use('/api/reservas', reservasRoutes);

export default app;