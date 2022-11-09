//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import cors from 'cors';

//importar archivos de rutas
import rolesRoutes from "./routes/rolesRoutes.js";
import especialidadesRoutes from "./routes/especialidadesRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import agendaCitasRoutes from "./routes/agendaCitasRoutes.js";

//iniciar el servidor de express
const app = express();
app.use(express.json());//para leer datos en formato json

//permitir leer archivos .env
dotenv.config();

//conectarnos a la base de datos
conectarDB();

//permitir conexiones entrantes de otros dominios con cors
const whiteList = [process.env.FRONTEND_URL];

const cosrsOption = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            //puede consultar el api
            callback(null, true);
        } else {
            //no esta permitido consultar el api
            callback(new Error("Error de Cors."))
        }
    },
};
app.use(cors(cosrsOption));

//definicion de las rutas o routing
app.use("/api/roles", rolesRoutes);
app.use("/api/especialidades", especialidadesRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/agendacitas", agendaCitasRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});

