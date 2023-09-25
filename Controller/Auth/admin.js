const mongoose = require("mongoose");
// const User = require("../../Model/admincredential");

//////////////////////////////////////////POST login
const adminLog = async (req, res) => {
  const newOb = {
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
  };
  res.status(200).send(newOb);
};
//////////////////////////////////////////////// POST register
const adminReg = async (req, res) => {
  res.status(200).send({ data: "This Registration page" });
};

///////////////////////////
module.exports = { adminLog, adminReg };
