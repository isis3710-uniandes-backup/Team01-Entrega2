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

/**
 * Modifica una monitoria
 */
function putMonitoria(req, res){
    let identificador = req.params.idMonitoria
    let dataPut = req.body
    let id = new ObjectId(identificador);
    conn.then(client => {
        client.db(databaseName).collection("monitorias").updateOne({_id: id}, {$set: dataPut}, dataPut, (err, data) => {
            if (err !=null) throw err;
            res.send(data);
        });
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

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
module.exports = router;
