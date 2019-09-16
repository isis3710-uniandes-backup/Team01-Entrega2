var express = require('express');
var router = express.Router();
const { databaseUser, databasePassword } = require('./config');
const mongoClient = require("mongodb").MongoClient;
const uri = "";


//connect to mongo db
mongoClient.connect("", {
  useNewUrlParser : true,
  useUnifiedTopology: true
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
