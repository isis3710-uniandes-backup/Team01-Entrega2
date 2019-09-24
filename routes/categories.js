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
 * Put a tutor in a Subject
 */
function putTutorInCategory(req, res){
    let idCategory = req.params.idCategory
    let tutor = req.params.user;

    let tutores = [];
    conn.then(client => {
        let id = new ObjectId(idCategory);
        client.db(databaseName).collection("categories").find({_id: id}).toArray((err, dataCategory) => {

            if (err) res.send(err);
            else if (dataCategory.length == 0) {
                res.send("No existe la Categoria con el id: " + idCategory);
            } else if (dataCategory[0] != null && dataCategory[0].length != 0) {
                client.db(databaseName).collection("tutors").find({usuario: tutor}).toArray((err, data) => {
                    if (data.length == 0) res.send("No existe el tutor con el usuario: " + tutor);
                    else {
                        dataCategory[0].tutores.forEach(tutor => {
                            tutores.push(tutor);
                        });
                        tutores.push(tutor);
                        client.db(databaseName).collection("categories").updateOne({_id: id}, {$set: {"tutores": tutores}}, (err, data) => {
                            res.send(data);
                        });
                    }
                });
            }
        });
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
function getTutorsOfCategory(req, res){
    let idCategory = req.params.idCategory;
    let id = new ObjectId(idCategory);
    conn.then(client => {
        client.db(databaseName).collection("categories").find({_id : id})
            .toArray((err,data)=> {
                if(err) throw err;
                let tutors = [];
                data.forEach(category => {
                    category.tutores.forEach(tutor => {
                        tutors.push(tutor);
                    });
                });
                res.send(tutors);
            })
    });
}


 //------------------------ROUTES------------------------------------------
router.post('/',(req,res) => postCategory(req,res));

router.get('/',(req,res) => getCategories(req,res));
router.get('/:idCategory',(req,res) => getCategory(req,res));
router.get('/:idCategory/tutors',(req,res) => getTutorsOfCategory(req,res));

router.put('/:idCategory',(req,res) => putCategory(req,res));
router.put('/:idCategory/tutors/:user',(req,res) => putTutorInCategory(req, res));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
