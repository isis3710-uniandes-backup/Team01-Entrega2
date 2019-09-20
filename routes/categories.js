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

//Import the models

var Categoria = require('mongoose').model('Categoria');
var Materia = require('mongoose').model('Materia');

//

/**
 * Create a Category
 */
function postCategory(req, res) {
    let categoria = new Categoria(req.body);
    categoria.validate(err => {
        if (err != null) res.send(err.message);
        else {
            conn.then(client => {
                client.db(databaseName).collection("categories").insertOne(categoria, (err, data) => {
                    if (err != null) throw err;
                    res.send(data);
                });
            });
        }
    });
}

/**
 * Create an Subject
 */
function postSubject(req, res) {
    let idCategory = req.params.idCategory;
    let materias = [];
    let subject = new Materia(req.body);
    subject.validate(err => {
        if (err != null) res.send(err.message);
        else {
            conn.then(client => {
                let id = new ObjectId(idCategory);
                client.db(databaseName).collection("categories").find({_id: id}).toArray((err, data) => {
                    if (err) res.send(err);
                    else if (data.length == 0) {
                        res.send("No existe la categoria con el id: " + idCategory);
                    } else if (data[0] != null && data[0].length != 0) {
                        data[0].materias.forEach(materia => {
                            materias.push(materia);
                        });
                        conn.then(client => {
                            client.db(databaseName).collection("subjects").insertOne(subject, (err, data) => {
                                if (err != null) res.send(err);
                                materias.push(data.ops[0].nombre);
                                client.db(databaseName).collection("categories").updateOne({_id: id}, {$set: {"materias": materias}});
                                res.send(data);
                            });
                        });
                    }
                });
            });
        }
    });
}

/**
 * Modify a category
 */
function putCategory(req, res) {
    let idCategory = req.params.idCategory;
    let dataPut = req.body;
    conn.then(client => {
        let id = new ObjectId(idCategory);
        client.db(databaseName).collection("categories").updateOne({_id: id}, {$set: dataPut}, dataPut, (err, data) => {
            if (err != null) throw err;
            res.send(data);
        });
    });
}

/**
 * Modify a Subject
 */
function putSubject(req, res) {
    let idCategory = req.params.idCategory;
    let idSubject = req.params.idSubject;
    let dataPut = req.body;

    if(dataPut.nombre != null){
        let id = new ObjectId(idCategory);
        let materias = [];
        conn.then(client => {
            client.db(databaseName).collection("categories").find({_id: id}).toArray((err, data) => {
                if (err) res.send(err);
                else if (data[0]!=null && data[0].length != 0) {
                    data[0].materias.forEach(materia => {
                        if(materia != dataPut.nombre){
                            materias.push(materia);
                        }
                    });
                }
            });
        });
        conn.then(client => {
            materias.push(dataPut.nombre);
            client.db(databaseName).collection("categories").updateOne({_id: id}, {$set: {"materias": materias}});
            let id2 = new ObjectId(idSubject);
            client.db(databaseName).collection("subjects").updateOne({_id: id2}, {$set: dataPut}, dataPut, (err, data) => {
                if (err != null) throw err;
                res.send(data);
            });
        });
    }
}

/**
 * Put a tutor in a Subject
 */
function putTutorInSubject(req, res){
    let idSubject = req.params.idSubject
    let tutor = req.params.user;

    let tutores = [];
    conn.then(client => {
        let id = new ObjectId(idSubject);
        client.db(databaseName).collection("subjects").find({_id: id}).toArray((err, dataSubject) => {

            if (err) res.send(err);
            else if (dataSubject.length == 0) {
                res.send("No existe la materia con el id: " + idSubject);
            } else if (dataSubject[0] != null && dataSubject[0].length != 0) {

                conn.then(client => {
                    client.db(databaseName).collection("users").find({usuario: tutor}).toArray((err, data) => {
                        if (data.length == 0) res.send("No existe el tutor con el usuario: " + tutor);
                        else {
                            dataSubject[0].tutores.forEach(tutor => {
                                tutores.push(tutor);
                            });
                            tutores.push(tutor);
                            conn.then(client => {
                                client.db(databaseName).collection("subjects").updateOne({_id: id}, {$set: {"tutores": tutores}}, (err, data) => {
                                    res.send(data);
                                });
                            });
                        }
                    });
                });
            }
        });
    });
}

 /**
  * Get all the courses
  */
 function getSubjects(req, res){
  conn.then(client => {
    client.db(databaseName).collection("subjects").find({})
    .toArray((err,data)=> {
      if(err) throw err;
      res.send(data);
    })
  });
 }

  /**
  * Get all the Categories
  */
 function getCategories(req, res){
  conn.then(client => {
    client.db(databaseName).collection("categories").find({})
    .toArray((err,data)=> {
      if(err) throw err;
      res.send(data);
    })
  });
 }

/**
 * Get a category.
 */
function getCategory(req, res){
    let idCategory = req.params.idCategory;
    let id = new ObjectId(idCategory);
    conn.then(client => {
        client.db(databaseName).collection("categories").find({_id : id})
            .toArray((err,data)=> {
                if(err) throw err;
                res.send(data);
            })
    });
}

/**
 * Get the subjects of a category.
 */
function getCategorySubjects(req, res){
    let idCategory = req.params.idCategory;
    let id = new ObjectId(idCategory);
    conn.then(client => {
        client.db(databaseName).collection("categories").find({_id : id})
            .toArray((err,data)=> {
                if(err) throw err;
                let courses = [];
                data.forEach(category => {
                    category.materias.forEach(course => {
                        courses.push(course);
                    });
                });
                res.send(courses);
            })
    });
}


 //------------------------ROUTES------------------------------------------
router.post('/',(req,res) => postCategory(req,res));
router.post('/:idCategory/subjects',(req,res) => postSubject(req,res));

router.get('/',(req,res) => getCategories(req,res));
router.get('/subjects',(req,res) => getSubjects(req,res));
router.get('/:idCategory',(req,res) => getCategory(req,res));
router.get('/:idCategory/subjects',(req,res) => getCategorySubjects(req,res));

router.put('/:idCategory',(req,res) => putCategory(req,res));
router.put('/:idCategory/subjects/:idSubject',(req,res) => putSubject(req,res));
router.put('/subjects/:idSubject/tutors/:user',(req,res) => putTutorInSubject(req, res));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
