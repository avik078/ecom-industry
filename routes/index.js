var express = require('express');
var router = express.Router();
var  product_path = require("./product_path")
var  custom_route = require("./custom_route")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET API page. */

router.use('/api',product_path)
router.use('/api',custom_route)
module.exports = router;
