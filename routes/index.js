var express = require('express');
var router = express.Router();
var  product_path = require("./product_path")
var  custom_route = require("./custom_route")
var  admin_login_route = require("./admin_login_route");

// const middleware = require('../../service/middleware').middleware;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET API page. */
router.use('/api/cus',custom_route)
router.use('/api',product_path)
router.use('/api/admin',admin_login_route)
module.exports = router;
