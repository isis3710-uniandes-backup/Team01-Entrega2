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



 /**
  * Get all the courses
  */
 function getCourses(req, res){
  conn.then(client => {
    client.db(databaseName).collection("courses").find({})
    .toArray((err,data)=> {
      if(err) throw err;
      res.send(data);
    })
  });
 }
  /**
  * Get all the courses
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
 router.get('/categories',(req,res) => getCategories(req,res));
 router.get('/categories/:categoryName',(req,res) => getCoursesOfCategory(req,res));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
