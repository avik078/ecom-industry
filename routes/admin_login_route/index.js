var express = require('express');
var router = express.Router();

var admin = require("../../Controller/Auth/admin");
var product = require("../../Controller/Auth/product");
const middleware = require('../../service/middleware').middleware;
const  admin_get_data = require("./admin_get_data");


//////////////////////////////////////////////
router.post("/login",admin.adminLog)
router.post("/reg",admin.adminReg)
// ///////////////////////////////////////////////////
router.use(middleware);
router.use('/', admin_get_data) ;
/////////////////////////////////////////////////////////////

module.exports = router;