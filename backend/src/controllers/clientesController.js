const clientesController = {};
import clientesModel from "../models/clientes.js"

clientesController.getCliente = async (req, res) => {
    const clientes = await clientesModel.find();
    res.json (clientes);
};

clientesController.getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await clientesModel.findById(id);

        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }

        res.json(cliente);
    } catch (error) {
        console.error('Error al obtener cliente por ID:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

clientesController.getAllClientes = async (req, res) => {
    try {
        const clientes = await clientesModel.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de clientes', error });
    }
};

clientesController.createCliente = async (req, res) => {
    const { name, email, password, phone, age } = req.body;

    // Verificar campos obligatorios
    if (!name || !email || !password || !phone || !age) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Formato de correo inválido" });
    }

    try {
        // Verificar si ya existe un cliente con el mismo email
        const clienteExistente = await clientesModel.findOne({ email });
        if (clienteExistente) {
            return res.status(409).json({ message: "Ya existe un cliente registrado con este correo" });
        }

        // Crear nuevo cliente
        const newCliente = new clientesModel({ name, email, password, phone, age });
        await newCliente.save();

        res.status(201).json({ message: "Cliente registrado correctamente" });
    } catch (error) {
        console.error("Error al registrar cliente:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

clientesController.deleteCliente = async(req,res) => {
    const deleteCliente = await clientesModel.findByIdAndDelete(req.params.id);
    if (!deleteCliente){
        return res.status(404).json({message: "cliente dont find"});
    
    }
    res.json ({message: "cliente deleted"});
};

clientesController.updateCliente = async (req,res) => {

    const{ name,email,password,phone,age} = req.body;

    await clientesModel.findByIdAndUpdate(
        req.params.id,
        {
            name,
            email,
            password,
            phone,
            age,
        },
        { new: true}
    );
   
    res.json ({message: "cliente update"});
};

export default clientesController;