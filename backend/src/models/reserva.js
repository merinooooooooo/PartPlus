import { Schema, model, Types } from 'mongoose';

const reservaSchema = new Schema(
    {
        clientId: {
            type: Types.ObjectId,
            ref: 'clientes', 
            required: true,
        },
        vehicle: {
            type: String,
            required: true,
        },
        service: {
            type: String,
            required: true,
        },
        status: {
            type: String,
        }
    },
    {
        timestamps: true,
        strict: false,
    }
);

export default model('reservas', reservaSchema);
