var mongoose = require('mongoose');

var monitoriaSchema = new mongoose.Schema({
    descripcion: {type: String, required: true},
    duracion: {type: Number, required: true},
    cuposRestantes: {type: Number, required: true},
    fecha: {type: Date, required: true},
    direccion: {type: String, required: true},
    comentarios: {type: [String], default: []},
    costo: {type: Number, required: true},
    calificacionServicio: {type: Number, default: 0},
    tipo: {type: String, enum: ["Individual", "Grupal"], required: true},
    finalizada: {type: Boolean, default: false},
    materias: {type: [String], required: true, minlength: 1, default: undefined}
});

var estudianteSchema = new mongoose.Schema({
    usuario: {type: String, required: true},
    nombre: String,
    apellidos: String,
    contrasenna: {type: String, required: true},
    telefono: Number,
    email: String,
    cedula: String,
    monitoriasRealizadas: [Number]
});

var tutorSchema = new mongoose.Schema({
    usuario: {type: String, required: true},
    nombre: String,
    apellidos: String,
    contrasenna: {type: String, required: true},
    telefono: Number,
    email: String,
    cedula: String,
    calificacion: {type: Number, min: 0, max: 10, default: 0},
    monitoriasOfrecidas: [Number]
});

var materiaSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    tutores: {type: [String], default: []}
});

var categoriaSchema = new mongoose.Schema({
    nombre: {type: String, index: true, unique: true, required: true},
    descripcion: String,
    materias: {type: [String], default: []}
});

module.exports = mongoose.model('Tutor', tutorSchema);
module.exports = mongoose.model('Estudiante', estudianteSchema);
module.exports = mongoose.model('Monitoria', monitoriaSchema);
module.exports = mongoose.model('Materia', materiaSchema);
module.exports = mongoose.model('Categoria', categoriaSchema);
