var express = require('express');
var router = express.Router();
var wishlist = require("../../Controller/Auth/wishlist");


/////////////////////////////////////////////////////////////
router.get("/getexclude",wishlist.getExcluded)
router.post("/postwish", wishlist.addWish)
/////////////////////////////////////////////////////////////




module.exports = router;