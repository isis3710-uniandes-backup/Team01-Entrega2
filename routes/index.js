var express = require('express');
var router = express.Router();
const cool = require('cool-ascii-faces');

router.get('/cool', (req, res) => res.send(cool()));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
