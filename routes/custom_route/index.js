var express = require('express');
var router = express.Router();
var user = require("../../Controller/Auth/user");




router.get("/get", user.getFive)
router.get("/get/pagi", user.getPagi)
router.post("/entry", user.userPost)
router.put("/edit/:id",user.userPut)
router.delete("/del/:id",user.userDel)
/////////////////////////////////////////////////////////////

module.exports = router;