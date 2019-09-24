var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
const { databaseUser, databasePassword, databaseName } = require('../config');
const mongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://"+databaseUser+":"+databasePassword+"@cluster0-j6ym9.mongodb.net/test?retryWrites=true&w=majority";
var cors = require('cors')


//connect to mongo db

let conn =  mongoClient.connect(uri, {
  useNewUrlParser : true,
  useUnifiedTopology: true
})
    .catch(error => {
      console.error(error);
    });

//

//Import the models

var Tutor = require('mongoose').model('Tutor');
var Estudiante = require('mongoose').model('Estudiante');
var Monitoria = require('mongoose').model('Monitoria');

//

/**
 * Create a Tutor
 */
function postTutor(req, res){
  let tutor = new Tutor(req.body);
  tutor.validate( err => {
     if(err!=null) res.send(err.message);
     else{
         conn.then(client => {
             client.db(databaseName).collection("tutors").find({"usuario": tutor.usuario}).toArray((err, data) =>{
                 if(data.length!=0){
                     res.send({"mensaje": "Ya existe un tutor con el nombre de usuario: " + tutor.usuario});
                 }
                 else{
                     client.db(databaseName).collection("tutors").insertOne(tutor, (err, data) => {
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
 * Create a Student
 */
function postStudent(req, res){
    let student = new Estudiante(req.body);
    student.validate( err => {
        if(err!=null) res.send(err.message);
        else{
            conn.then(client => {
                client.db(databaseName).collection("students").find({"usuario": student.usuario}).toArray((err, data) =>{
                    if(data.length!=0){
                        res.send({"mensaje": "Ya existe un student con el nombre de usuario: " + student.usuario});
                    }
                    else{
                        client.db(databaseName).collection("students").insertOne(student, (err, data) => {
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
 * Crea una monitoria
 */
function postMonitoria(req, res) {
    let monitoria = new Monitoria(req.body);
    let tutor = req.params.user;
    let idCategory = req.params.idCategory
    let id = new ObjectId(idCategory);
    let monitorias = [];
    monitoria.validate(err => {
        if (err != null) res.send(err.message);
        else {
            conn.then(client => {
                client.db(databaseName).collection("tutors").find({usuario: tutor}).toArray((err, dataTutors) => {
                    if (dataTutors.length == 0) res.send("No existe el tutor con el usuario: " + tutor);
                    else {
                        client.db(databaseName).collection("categories").find({_id: id}).toArray((err, dataCategories) => {
                            if (dataCategories.length == 0) res.send("No existe la categoria con id: " + idCategory);
                            else {
                                monitoria.categoria = id;
                                dataTutors[0].monitoriasOfrecidas.forEach(monitoria => {
                                    monitorias.push(monitoria);
                                });
                                client.db(databaseName).collection("monitorias").insertOne(monitoria, (err, dataMonitorias) => {
                                    if (err != null) throw err;
                                    else {
                                        monitorias.push(dataMonitorias.ops[0]._id);
                                        client.db(databaseName).collection("tutors").updateOne({usuario: tutor}, {$set: {monitoriasOfrecidas: monitorias}}, (err, data) => {
                                            res.send(dataMonitorias);
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    });
}

/**
 * Modify a Tutor
 */
function putTutor(req, res){
  let tutor = req.params.user;
  let dataPut = req.body;
  conn.then(client => {
    client.db(databaseName).collection("tutors").updateOne({"usuario": tutor}, {$set: dataPut}, dataPut, (err, data) => {
      if (err !=null) throw err;
      res.send(data);
    });
  });
}

/**
 * Modify a Student
 */
function putStudent(req, res){
    let student = req.params.user
    let dataPut = req.body
    conn.then(client => {
        client.db(databaseName).collection("students").updateOne({"usuario": student}, {$set: dataPut}, dataPut, (err, data) => {
            if (err !=null) throw err;
            res.send(data);
        });
    });
}

/**
 * Put a student inside a monitoria
 */
function putStudentInMonitoria(req, res){
    let student = req.params.user;
    let idMonitoria = req.params.idMonitoria;
    let monitorias = [];
    let id = new ObjectId(idMonitoria);
    conn.then(client => {
        conn.then(client => {
            client.db(databaseName).collection("students").find({usuario: student}).toArray((err, dataStudent) => {
                if (dataStudent.length == 0) res.send("No existe el estudiante con el usuario: " + student);
                else {
                    client.db(databaseName).collection("monitorias").find({_id: id}).toArray((err, dataMonitoria) => {
                        if (dataMonitoria.length == 0) res.send("No existe la monitoria con el id: " + idMonitoria);
                        else if(dataMonitoria.length != 0 && dataMonitoria[0].cuposRestantes == 0) res.send("No hay cupa para la monitoria con id: " + idMonitoria);
                        else {
                            dataStudent[0].monitoriasRealizadas.forEach(idMonitoria => {
                                monitorias.push(idMonitoria);
                            });
                            monitorias.push(dataMonitoria[0]._id);
                            conn.then(client => {
                                client.db(databaseName).collection("students").updateOne({usuario: student}, {$set: {monitoriasRealizadas: monitorias}}, (err, data) => {
                                    if(err!=null) res.send(err.message);
                                    else{
                                        client.db(databaseName).collection("monitorias").updateOne({_id: id}, {$set: {cuposRestantes: dataMonitoria[0].cuposRestantes - 1}}, (err, data) => {
                                            if (err != null) res.send(err.message);
                                            res.send(data);
                                        });
                                    }
                                });
                            });
                        }
                    });
                }
            });
        });
    });
}

/**
 * Get the tutors.
 */
function getTutors(req, res){
  conn.then(client => {
    client.db(databaseName).collection("tutors").find({})
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
    client.db(databaseName).collection("students").find({})
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
    client.db(databaseName).collection("tutors").find({"usuario": usuario})
        .toArray((err,data)=> {
          if(err) res.send(err);
          else {
              if(data.length==0){
                  client.db(databaseName).collection("students").find({"usuario": usuario})
                      .toArray((err,data)=> {
                          if(err) res.send(err);
                          else res.send(data);
                      });
              }
              else{
                  res.send(data);
              }
          }
        })
  });
}

//------------------------ROUTES------------------------------------------
router.post('/:user/categories/:idCategory/monitorias', cors(), (req,res) => postMonitoria(req,res));
router.post('/tutors',(req,res) => postTutor(req, res));
router.post('/students',(req,res) => postStudent(req, res));

router.get('/tutors',(req,res) => getTutors(req,res));
router.get('/students',(req,res) => getStudents(req,res));
router.get('/:user',(req,res) => getUsersByUsuario(req,res));

router.put('/tutors/:user',(req,res) => putTutor(req, res));
router.put('/students/:user',(req,res) => putStudent(req, res));
router.put('/students/:user/monitorias/:idMonitoria',(req,res) => putStudentInMonitoria(req, res));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
