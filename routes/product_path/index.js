var express = require('express');
var router = express.Router();
var product = require("../../Controller/Auth/product");
var  middleware_1 = require("../../service/middleware").middleware_1

/////////////////////////////////////////////////////////////
router.get("/", product.productGetHome)   
router.get("/productget", product.productGet)
router.get("/customerData",product.joinedDataGet)  
router.get("/groupPro",product.groupProduct) 
router.get("/getAvgIncome",product.avgCusExp) 
router.use(middleware_1)                          
router.post("/productentry", product.productPost)
/////////////////////////////////////////////////////////////

module.exports = router;