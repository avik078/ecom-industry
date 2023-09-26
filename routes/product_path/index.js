var express = require('express');
var router = express.Router();
var product = require("../../Controller/Auth/product");
var  middleware_1 = require("../../service/middleware").middleware_1

/////////////////////////////////////////////////////////////
router.get("/", product.productGetHome)   

router.get("/customerData",product.joinedDataGet)  
router.get("/groupPro",product.groupProduct) 
router.get("/getAvgIncome",product.avgCusExp) 
router.use(middleware_1)                    
router.post("/productentry", product.productPost)
router.get("/getonlypro" , product.groupProCusID)
router.get("/productget", product.productGet)
/////////////////////////////////////////////////////////////
// getonlypro
module.exports = router;