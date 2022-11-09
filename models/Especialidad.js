import mongoose from "mongoose";

const especialidadSchema = mongoose.Schema({
    nombreEspecialidad: {
        type: String,
        require: true,
        trim: true
    }
}, {
    timestamps: true
});

const Especialidad = mongoose.model("Especialidad", especialidadSchema);
export default Especialidad;