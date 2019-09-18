var express = require('express');
var router = express.Router();
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
 * Crea una monitoria
 */
function postMonitoria(req, res){
    let dataPost = req.body
    conn.then(client => {
        client.db(databaseName).collection("monitorias").insertOne(dataPost, (err, data) => {
            if (err !=null) throw err;
            res.send(data);
        });
    });
}

/**
 * Modifica una monitoria
 */
function putMonitoria(req, res){
    let identificador = req.params.id
    let dataPut = req.body
    conn.then(client => {
        client.db(databaseName).collection("users").updateOne({"identificador": identificador}, {$set: dataPut}, dataPut, (err, data) => {
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
    let id = req.params.id
    conn.then(client => {
        client.db(databaseName).collection("monitorias").find({"identificador": id})
            .toArray((err,data)=> {
                if(err) throw err;
                console.log(data);
                res.send(data);
            })
    });
}


//------------------------ROUTES------------------------------------------
router.post('/',(req,res) => postMonitoria(req,res));

router.get('/',(req,res) => getMonitorias(req,res));
router.get('/:id',(req,res) => getMonitoriasById(req,res));

router.put('/:id',(req,res) => putMonitoria(req,res));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
module.exports = router;
