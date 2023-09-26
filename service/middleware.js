const mongoose =  require("mongoose")
const jwt_decode = require('jwt-decode');
const sign = require('jwt-encode');

/////////////////////////////////Token decode
const  decoder = (token) => {
  const decodedHeader = jwt_decode(token);
  console.log(decodedHeader);
  return decodedHeader;
}
/////////////////////////////////Token Generate
const  encoder = (data) => {
  const secret = 'secret'; 
  const jwt = sign(data, secret);
  console.log(jwt)
  return jwt
}
////////////////////////////////////

const user = {} ;


///////////////////////////////////////////////////
user.middleware = async (req, res, next) => {
  console.log("Hi this middleware")
  
}
/////////////////////////////////////////////////////////////
user.middleware_1 = async (req, res, next) => {
  console.log("Hi this middleware for product upload")
  const  token = req.headers.authorization
  console.log(token)
  const  userID= decoder(token)._id
  console.log(userID)
  req.userID = userID
  next()
// const userID = new mongoose.Types.ObjectId
// req.userID = userID
//   console.log({name,details,price,customerId})
//  res.status(200).json({data:"id recovered successfully"})
//  return ({name,details,price,customerId})
 
}

module.exports = user;
