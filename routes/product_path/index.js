var express = require('express');
var router = express.Router();
var product = require("../../Controller/Auth/product");


/////////////////////////////////////////////
router.get("/", product.productGetHome)
router.get("/productget", product.productGet)  
router.get("/customerData",product.joinedDataGet)                                
router.post("/productentry", product.productPost)
/////////////////////////////////////////////////////////////

module.exports = router;