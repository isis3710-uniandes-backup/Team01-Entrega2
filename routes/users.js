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
 * Create an User
 */
function postUser(req, res){
  let dataPost = req.body
  conn.then(client => {
    client.db(databaseName).collection("users").insertOne(dataPost, (err, data) => {
      if (err !=null) throw err;
      res.send(data);
    });
  });
}

/**
 * Modify an User
 */
function putUser(req, res){
  let usuario = req.params.user
  let dataPut = req.body
  conn.then(client => {
    client.db(databaseName).collection("users").updateOne({"usuario": usuario}, {$set: dataPut}, dataPut, (err, data) => {
      if (err !=null) throw err;
      res.send(data);
    });
  });
}

/**
 * Get the tutors.
 */
function getTutors(req, res){
  conn.then(client => {
    client.db(databaseName).collection("users").find({"tipo": "tutor"})
        .toArray((err,data)=> {
          if(err) throw err;
          res.send(data);
        })
  });
}

/**
 * Get the students.
 */
function getStudents(req, res){
  conn.then(client => {
    client.db(databaseName).collection("users").find({"tipo": "estudiante"})
        .toArray((err,data)=> {
          if(err) throw err;
          res.send(data);
        })
  });
}

/**
 * Get the User by usuario.
 */
function getUsersByUsuario(req, res){
  let usuario = req.params.user
  conn.then(client => {
    client.db(databaseName).collection("users").find({"usuario": usuario})
        .toArray((err,data)=> {
          if(err) throw err;
          res.send(data);
        })
  });
}

//------------------------ROUTES------------------------------------------
router.post('/',(req,res) => postUser(req, res));

router.get('/tutors',(req,res) => getTutors(req,res));
router.get('/students',(req,res) => getStudents(req,res));
router.get('/:user',(req,res) => getUsersByUsuario(req,res));

router.put('/:user',(req,res) => putUser(req, res));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
