/*\
Clientes:
name
email
password
phone 
age
*/

import { Schema, model} from 'mongoose';

const clientesSchema = new Schema(
    {
        name:{
            type: String,
        },
        email:{
            type: String,
        },
        password:{
            type: String,
        },
        phone: {
            type: Number,
        },
        age:{
            type: Number,
        }
    
    },
    {
        timestamps: true,
        strict:false,
    }
);

export default model ("clientes", clientesSchema);