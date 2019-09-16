var express = require('express');
var router = express.Router();
const { databaseUser, databasePassword, databaseName } = require('../config');
const mongoClient = require("mongodb").MongoClient;
const uri = "";


//connect to mongo db
/**
 * let conn =  mongoClient.connect("", {
  useNewUrlParser : true,
  useUnifiedTopology: true
})
 */


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
 //------------------------ROUTES------------------------------------------
 router.get('/courses',(req,res) => getCourses(req,res));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
