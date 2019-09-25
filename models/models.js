var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;

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
    categoria: {type: ObjectId},
    materia: {type: String}
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

var categoriaSchema = new mongoose.Schema({
    nombre: {type: String, index: true, unique: true, required: true},
    descripcion: String,
    tutores: {type: [String], default: []},
    rutaFront: {type: String, default: "https://tutofinder.herokuapp.com/"}
});

module.exports = mongoose.model('Tutor', tutorSchema);
module.exports = mongoose.model('Estudiante', estudianteSchema);
module.exports = mongoose.model('Monitoria', monitoriaSchema);
module.exports = mongoose.model('Categoria', categoriaSchema);
