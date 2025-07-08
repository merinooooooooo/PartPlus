import { Router } from 'express';
import reservasController from '../controllers/reservaController.js';

const router = Router();

// Obtener lista genérica (similar a getCliente)
router.get('/reserva', reservasController.getReserva);

// Obtener todas las reservas
router.get('/reservas', reservasController.getAllReservas);

// Obtener una reserva por ID
router.get('/reservas/:id', reservasController.getReservaById);

// Crear una nueva reserva
router.post('/reservas', reservasController.createReserva);

// Actualizar una reserva por ID
router.put('/reservas/:id', reservasController.updateReserva);

// Eliminar una reserva por ID
router.delete('/reservas/:id', reservasController.deleteReserva);

export default router;
