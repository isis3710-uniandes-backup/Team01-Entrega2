var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
const { databaseUser, databasePassword, databaseName } = require('../config');
const mongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://"+databaseUser+":"+databasePassword+"@cluster0-j6ym9.mongodb.net/test?retryWrites=true&w=majority";

//connect to mongo db

let conn =  mongoClient.connect(uri, {
    useNewUrlParser : true,
    useUnifiedTopology: true
})
    .catch(error => {
        console.error(error);
    })

//

var Comentario = require('mongoose').model('Comentario');

/**
 * Modifica una monitoria
 */
function putMonitoria(req, res){
    let identificador = req.params.idMonitoria;
    let dataPut = req.body;
    let id = new ObjectId(identificador);
    conn.then(client => {
        client.db(databaseName).collection("monitorias").updateOne({_id: id}, {$set: dataPut}, dataPut, (err, data) => {
            if (err !=null) throw err;
            res.send(data);
        });
    });
}

/**
 * Modifica una monitoria
 */
function putComentarioInMonitoria(req, res) {
    let identificador = req.params.idMonitoria;
    let comentario = new Comentario(req.body);
    let id = new ObjectId(identificador);
    let comentarios = [];
    comentario.validate(err => {
        if (err != null) res.send(err.message);
        else {
            conn.then(client => {
                client.db(databaseName).collection("monitorias").find({_id: id})
                    .toArray((err, data) => {
                        if (err) throw err;
                        else if(data.length == 0) res.send("No existe la monitoria con el id: " + identificador);
                        else{
                            data[0].comentarios.forEach(comentario => {
                                comentarios.push(comentario);
                            });
                            comentarios.push(comentario);
                            client.db(databaseName).collection("monitorias").updateOne({_id: id}, {$set: {comentarios: comentarios}}, (err, data) => {
                                if (err != null) throw err;
                                res.send(data);
                            });
                        }
                    });
            });
        }
    });
}

/**
 * Obtiene las monitorias.
 */
function getMonitorias(req, res){
    conn.then(client => {
        client.db(databaseName).collection("monitorias").find({})
            .toArray((err,data)=> {
                if(err) throw err;
                res.send(data);
            })
    });
}

/**
 * Obtiene la monitoria por el identificador.
 */
function getMonitoriasById(req, res){
    let identificador = req.params.idMonitoria;
    let id = new ObjectId(identificador);
    conn.then(client => {
        client.db(databaseName).collection("monitorias").find({_id: id})
            .toArray((err,data)=> {
                if(err) throw err;
                res.send(data);
            })
    });
}




//------------------------ROUTES------------------------------------------

router.get('/',(req,res) => getMonitorias(req,res));
router.get('/:idMonitoria',(req,res) => getMonitoriasById(req,res));

router.put('/:idMonitoria',(req,res) => putMonitoria(req,res));
router.put('/:idMonitoria/users',(req,res) => putComentarioInMonitoria(req,res));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
module.exports = router;
