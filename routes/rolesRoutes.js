import express from "express";
const router = express.Router();
import { agregar, listar, eliminar, editar, listarUno, comboRoles } from "../controllers/rolesController.js";
import validarAutenticacion from "../middleware/validarAutenticacion.js";

//rutas privadas
router.get("/combo-roles", validarAutenticacion, comboRoles);
router.get("/", validarAutenticacion, listar);
router.get("/:id", validarAutenticacion, listarUno);
router.post("/", validarAutenticacion, agregar);
router.put("/:id", validarAutenticacion, editar);
router.delete("/:id", validarAutenticacion, eliminar);

export default router;