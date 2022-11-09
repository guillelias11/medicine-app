import express from "express";
const router = express.Router();
import { agregar, listar, eliminar, editar, listarUno, autenticar, crearCuenta, comboMedicos } from "../controllers/usuariosController.js";
import validarAutenticacion from "../middleware/validarAutenticacion.js";

//rutas privadas
router.get("/combo-medicos", validarAutenticacion, comboMedicos);
router.get("/", validarAutenticacion, listar);
router.get("/:id", validarAutenticacion, listarUno);
router.post("/", validarAutenticacion, agregar);
router.put("/:id", validarAutenticacion, editar);
router.delete("/:id", validarAutenticacion, eliminar);

//rutas publicas
router.post("/login", autenticar);
router.post("/crear-cuenta", crearCuenta);

export default router;