import { json } from "express";
import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";
import dominios from "../helpers/dominios.js";

const agregar = async (req, res) => {
    //evitar usuarios duplicados por usuarioAcceso
    const { usuarioAcceso } = req.body;
    const existeUsuario = await Usuario.findOne({ usuarioAcceso });

    if (existeUsuario) {
        const error = new Error("Usuario ya esta registrado en la base de datos.")
        return res.status(400).json({ msg: error.message, ok: "NO" });
    }

    try {
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();
        res.json({ body: usuarioGuardado, ok: "SI", msg: "Usuario Creado Correctamente." });
    } catch (error) {
        console.log(error);
    }
}

const listar = async (req, res) => {
    const usuarios = await Usuario.find().populate('idRol', {
        nombreRol: 1,
        _id: 0
    }).populate('idEspecialidad', {
        nombreEspecialidad: 1,
        _id: 0
    });
    res.json(usuarios);
}

const eliminar = async (req, res) => {
    //recibir los parametros por la url
    const { id } = req.params;

    //validamos si existe el registro a eliminar
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        const error = new Error("Usuario No Encontrado.");
        return res.status(404).json({ msg: error.message, ok: "NO" });
    }

    try {
        await usuario.deleteOne();
        res.json({ msg: "Usuario Eliminado Correctamente.", ok: "SI" });
    } catch (error) {
        console.log(error);
    }
}

const editar = async (req, res) => {
    //recibir los parametros por la url
    const { id } = req.params;

    //validamos si existe el registro a eliminar
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        const error = new Error("Usuario No Encontrado.");
        return res.status(404).json({ msg: error.message, ok: "NO" });
    }

    //capturar los datos enviados en el formulario
    usuario.idRol = req.body.idRol || usuario.idRol;
    usuario.idEspecialidad = req.body.idEspecialidad || usuario.idEspecialidad;
    usuario.nombresUsuario = req.body.nombresUsuario || usuario.nombresUsuario;
    usuario.celularUsuario = req.body.celularUsuario || usuario.celularUsuario;
    usuario.correoUsuario = req.body.correoUsuario || usuario.correoUsuario;
    usuario.direccionUsuario = req.body.direccionUsuario || usuario.direccionUsuario;
    usuario.usuarioAcceso = req.body.usuarioAcceso || usuario.usuarioAcceso;
    usuario.claveAcceso = req.body.claveAcceso || usuario.claveAcceso;
    usuario.estadoUsuario = req.body.estadoUsuario || usuario.estadoUsuario;

    try {
        const usuarioGuardado = await usuario.save();
        res.json({ body: usuarioGuardado, msg: "Usuario Actualizado Correctamente.", ok: "SI" });
    } catch (error) {
        console.log(error);
    }
}

const listarUno = async (req, res) => {
    //recibir los parametros por la url
    const { id } = req.params;

    //validamos si existe el registro a eliminar
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        const error = new Error("Usuario No Encontrado.");
        return res.status(404).json({ msg: error.message, ok: "NO" });
    }

    res.json(usuario);
}

const autenticar = async (req, res) => {
    const { usuarioAcceso, claveAcceso } = req.body;

    //comprobar si el usuario existe
    const usuario = await Usuario.findOne({ usuarioAcceso });
    if (!usuario) {
        const error = new Error("El usuario no existe.");
        return res.status(404).json({ msg: error.message, ok: "NO_EXISTE" });
    }

    //comprobar si la contraseña es correcta
    if (await usuario.comprobarClave(claveAcceso)) {
        res.json({
            _id: usuario._id,
            nombresUsuario: usuario.nombresUsuario,
            usuarioAcceso: usuario.usuarioAcceso,
            tokenJwt: generarJWT(usuario._id)
        });
    } else {
        const error = new Error("La clave es incorrecta.");
        res.json({ msg: error.message, ok: "CLAVE_INCORRECTA" });
    }
}

const crearCuenta = async (req, res) => {
    //evitar usuarios duplicados por usuarioAcceso
    const { usuarioAcceso } = req.body;
    const existeUsuario = await Usuario.findOne({ usuarioAcceso });

    if (existeUsuario) {
        const error = new Error("Usuario ya esta registrado en la base de datos.")
        return res.status(400).json({ msg: error.message, ok: "NO" });
    }

    try {
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();
        res.json({ body: usuarioGuardado, ok: "SI", msg: "Usuario Creado Correctamente." });
    } catch (error) {
        console.log(error);
    }
}

const comboMedicos = async (req, res) => {
    const usuarios = await Usuario.find({ idRol: dominios.ROL_MEDICO_ID });
    res.json(usuarios);
}

export {
    agregar,
    listar,
    eliminar,
    editar,
    listarUno,
    autenticar,
    crearCuenta,
    comboMedicos
}