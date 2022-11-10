import Especialidad from "../models/Especialidad.js";

const agregar = async (req, res) => {
    //evitar especialidades duplicadas
    const { nombreEspecialidad } = req.body;
    const existeEspecialidad = await Especialidad.findOne({ nombreEspecialidad });

    if (existeEspecialidad) {
        const error = new Error("Especialidad ya esta registrada en la base de datos.");
        return res.status(400).json({ msg: error.message, ok: "NO" });
    }

    try {
        const especialidad = new Especialidad(req.body);
        const especialidadGuardada = await especialidad.save();
        res.json({ body: especialidadGuardada, ok: "SI", msg: "Especialidad Creada Correctamente." });
    } catch (error) {
        console.log(error);
    }
}

const listar = async (req, res) => {
    const especialidades = await Especialidad.find();
    res.json(especialidades);
}

const eliminar = async (req, res) => {
    //recibir los parametros por la url
    const { id } = req.params;

    //validamos si existe el registro a eliminar
    const especialidad = await Especialidad.findById(id);

    if (!especialidad) {
        const error = new Error("Especialidad No Encontrada.");
        return res.status(404).json({ msg: error.message, ok: "NO" });
    }

    try {
        await especialidad.deleteOne();
        res.json({ msg: "Especialidad Eliminada Correctamente.", ok: "SI" });
    } catch (error) {
        console.log(error);
    }
}

const editar = async (req, res) => {
    //recibir los parametros por la url
    const { id } = req.params;

    //validamos si existe el registro a eliminar
    const especialidad = await Especialidad.findById(id);

    if (!especialidad) {
        const error = new Error("Especialidad No Encontrada.");
        return res.status(404).json({ msg: error.message, ok: "NO" });
    }

    //capturar los datos enviados en el formulario
    especialidad.nombreEspecialidad = req.body.nombreEspecialidad || especialidad.nombreEspecialidad

    try {
        const especialidadGuardada = await especialidad.save();
        res.json({ body: especialidadGuardada, msg: "Especialidad Actualizada Correctamente.", ok: "SI" });
    } catch (error) {
        console.log(error);
    }
}

const listarUno = async (req, res) => {
    //recibir los parametros por la url
    const { id } = req.params;

    //validamos si existe el registro a eliminar
    const especialidad = await Especialidad.findById(id);

    if (!especialidad) {
        const error = new Error("Especialidad No Encontrada.");
        return res.status(404).json({ msg: error.message, ok: "NO" });
    }

    res.json(especialidad);
}

export {
    agregar,
    listar,
    eliminar,
    editar,
    listarUno
}