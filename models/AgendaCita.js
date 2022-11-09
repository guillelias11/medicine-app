import mongoose from "mongoose";

const agendaCitaSchema = mongoose.Schema({
    //definimos la relacion por referencia con el modelo USUARIO
    idMedico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        require: true,
        trim: true
    },

    fechaCita: {
        type: String,
        require: true,
        trim: true
    },

    horaCita: {
        type: String,
        require: true,
        trim: true
    },

    numeroConsultorio: {
        type: String,
        require: true,
        trim: true
    },

    estadoCita: {
        type: Number,
        require: true,
        trim: true
    }
}, {
    timestamps: true
});

const AgendaCita = mongoose.model("AgendaCita", agendaCitaSchema);
export default AgendaCita;