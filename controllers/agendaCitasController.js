import AgendaCita from "../models/AgendaCita.js";

const agregar = async (req, res) => {
    try {
        console.log(req.body.horaCita);
        const cita = new AgendaCita(req.body);
        const citaGuardado = await cita.save();
        res.json({ body: citaGuardado, ok: "SI", msg: "Cita Creada Correctamente." });
    } catch (error) {
        console.log(error);
    }
}

const listar = async (req, res) => {
    const citas = await AgendaCita.find().populate('idMedico', {
        nombresUsuario: 1,
        _id: 0
    });
    res.json(citas);
}

const eliminar = async (req, res) => {
    //recibir los parametros desde la url
    const { id } = req.params;

    //validar si existe el documento
    const cita = await AgendaCita.findById(id);

    if (!cita) {
        const error = new Error("Cita No Encontrada.");
        return res.status(404).json({ msg: error.message, ok: "SI" });
    }

    try {
        await cita.deleteOne();
        res.json({ msg: "Cita Eliminada Correctamente.", ok: "SI" });
    } catch (error) {
        console.log(error);
    }

}

const editar = async (req, res) => {
    //recibir los parametros desde la url
    const { id } = req.params;

    //validar si existe el documento
    const cita = await AgendaCita.findById(id);

    if (!cita) {
        const error = new Error("Cita No Encontrada.");
        return res.status(404).json({ msg: error.message, ok: "SI" });
    }

    cita.idMedico = req.body.idMedico || cita.idMedico;
    cita.fechaCita = req.body.fechaCita || cita.fechaCita;
    cita.horaCita = req.body.horaCita || cita.horaCita;
    cita.numeroConsultorio = req.body.numeroConsultorio || cita.numeroConsultorio;
    cita.estadoCita = req.body.estadoCita || cita.estadoCita;

    try {
        const citaGuardada = await cita.save();
        res.json({ body: citaGuardada, msg: "Cita Actualizada Correctamente.", ok: "SI" });
    } catch (error) {
        console.log(error);
    }
}

const listarUno = async (req, res) => {
    //recibir los parametros desde la url
    const { id } = req.params;

    //validar si existe el documento
    const cita = await AgendaCita.findById(id);

    if (!cita) {
        const error = new Error("Cita no encontrada.");
        return res.status(404).json({ msg: error.message, ok: "SI" });
    }

    res.json(cita);
}

export {
    agregar,
    listar,
    eliminar,
    editar,
    listarUno
}