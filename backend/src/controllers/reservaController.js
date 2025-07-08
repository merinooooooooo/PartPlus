const reservasController = {};
import reservasModel from "../models/reserva.js";

// Obtener una lista genérica (similar a getCliente original)
reservasController.getReserva = async (req, res) => {
    const reservas = new reservasModel.find();
    res.json(reservas);
};

// Obtener reserva por ID
reservasController.getReservaById = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await reservasModel.findById(id);

        if (!reserva) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        }

        res.json(reserva);
    } catch (error) {
        console.error('Error al obtener reserva por ID:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

// Obtener todas las reservas
reservasController.getAllReservas = async (req, res) => {
    try {
        const reservas = await reservasModel.find();
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de reservas', error });
    }
};

// Crear una nueva reserva
reservasController.createReserva = async (req, res) => {
    const { clientId, vehicle, service, status } = req.body;

    // Validar campos obligatorios
    if (!clientId || !vehicle || !service) {
        return res.status(400).json({ message: "Los campos clientId, vehicle y service son obligatorios" });
    }

    try {
        const nuevaReserva = new reservasModel({
            clientId,
            vehicle,
            service,
            status,
        });

        await nuevaReserva.save();
        res.status(201).json({ message: "Reserva creada correctamente" });
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

// Eliminar una reserva por ID
reservasController.deleteReserva = async (req, res) => {
    const deleteReserva = await reservasModel.findByIdAndDelete(req.params.id);

    if (!deleteReserva) {
        return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.json({ message: "Reserva eliminada correctamente" });
};

// Actualizar una reserva por ID
reservasController.updateReserva = async (req, res) => {
    const { clientId, vehicle, service, status } = req.body;

    await reservasModel.findByIdAndUpdate(
        req.params.id,
        {
            clientId,
            vehicle,
            service,
            status,
        },
        { new: true }
    );

    res.json({ message: "Reserva actualizada correctamente" });
};

export default reservasController;
