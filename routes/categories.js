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
function postCategory(req, res){
    let dataPost = req.body
    conn.then(client => {
        client.db(databaseName).collection("categories").insertOne(dataPost, (err, data) => {
            if (err !=null) throw err;
            res.send(data);
        });
    });
}

/**
 * Modify a category
 */
function putCategory(req, res) {
    let categoryName = req.params.categoryName
    let dataPut = req.body
    conn.then(client => {
        client.db(databaseName).collection("categories").updateOne({"nombre": categoryName}, {$set: dataPut}, dataPut, (err, data) => {
            if (err != null) throw err;
            res.send(data);
        });
    });
}

 /**
  * Get all the courses
  */
 function getCourses(req, res){
  conn.then(client => {
    client.db(databaseName).collection("categories").find({})
    .toArray((err,data)=> {
      if(err) throw err;
      let courses = [];
      data.forEach(category => {
         category.courses.forEach(course => {
            courses.push(course);
         });
      });
      res.send(courses);
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
 * Get the courses of a category.
 */
function getCoursesOfCategory(req, res){
    let category = req.params.categoryName;
    conn.then(client => {
        client.db(databaseName).collection("categories").find({"category" : category})
            .toArray((err,data)=> {
                if(err) throw err;
                res.send(data);
            })
    });
}


 //------------------------ROUTES------------------------------------------
router.post('/',(req,res) => postCategory(req,res));

router.get('/',(req,res) => getCategories(req,res));
router.get('/courses',(req,res) => getCourses(req,res));
router.get('/:categoryName',(req,res) => getCoursesOfCategory(req,res));

router.put('/:categoryName',(req,res) => putCategory(req,res));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
