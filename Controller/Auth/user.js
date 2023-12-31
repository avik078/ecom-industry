const mongoose = require("mongoose");

const User = require("../../Model/user");
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

//////////////////////////////////////////////////// GET number of product per user 

const  getCountPro = async (req,res) => {

  await User.aggregate([
    {$lookup : {
      from: "product_1",
      localField: "_id",
      foreignField: "userID",
      as: "productDetails" ,
      pipeline: [

        {$project : {
            _id:1 ,
            name: 1 ,
            price:1 
        }} 
      ]
    }} ,
    {$addFields : {countpro: {$size:"$productDetails"}}},
    {
      $project : {
        createdBy:1,
        productDetails:1,
        countpro:1
      }
      }
    
  
     
  ]).then((data) =>
     res
    .status(200)
    .json({ status: true, msg: "Data get successfully !", data: data })
)
.catch((error) => {
  console.log(error)
  res.status(400).json({
    status: false,
    msg: "server error ! Please try again !!",
    data: error,
  })
}
);
}
///////////////////////////////////////////////////GET ONE 
const getOnlyOne = async (req,res) => {
  // await User.findOne({_id:"651168d3822be4e60a5a4da5"}).
  await User.findOne({_id: new mongoose.Types.ObjectId("651168d3822be4e60a5a4da5") }).
  then((data)=> res.status(200).send({TokenDecode:decoder(data.token)}))
}

////////////////////////////////////////////////// GET
const getFive = async (req, res) => {
  await User.aggregate([
    {
      $match: {
        // __v: 0,
        // userID: new mongoose.Types.ObjectId(req.user._id)
      },
    },
    {
      $project: {
        __v: 0,
      },
    },
  ])
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "Data get successfully !",
        data: data,
      });
    })
    .catch((error) => {
      console.log("error log ..", error);
      res.status(500).json({
        status: false,
        msg: "server error ! Please try agagin !!",
        error: "server error ! Please try agagin !!",
      });
    });
};
///////////////////////////////////////////////// GET Pagi
const getPagi = async (req, res) => {
  const skip = req.query.skip ? req.query.skip : 0;
  const limit = req.query.limit ? req.query.limit : 5;
  await User.aggregate([
    
    {
      $project: {
        __v: 0,
      },
    },
    {
      $skip: Number(skip),
    },
    {
      $limit: Number(limit),
    },
  ])
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "Data get successfully !",
        data: data,
      });
    })
    .catch((error) => {
      console.log("error log ..", error);
      res.status(500).json({
        status: false,
        msg: "server error ! Please try agagin !!",
        error: "server error ! Please try agagin !!",
      });
    });
};
//////////////////////////////////////////////// POST
const userPost = async (req, res) => {
  console.log("This  is new user post collection route")
  const genID = {
    _id: new mongoose.Types.ObjectId
  }
  
  const token = encoder(genID)
  console.log("token", token)
  console.log("_fsfd",genID)

  const newOb = {
    _id: genID,
    token: token,
    ...req.body,
  };
  console.log(newOb);
   await User.create(newOb)
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "Data uploaded successfully !",
        data: data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        msg: "server error ! Please try again !!",
        error:error.message,
      });
    });
};
///////////////////////////////////////////////// PUT
const userPut = async (req, res) => {
  const id = req.params.id;
  const newOb = req.body;
  console.log(newOb);

  await User.updateOne({ _id: id }, { $set: newOb }, { new: true })
    .then((data) => {
      res
        .status(200)
        .json({ status: true, msg: "Data changed successfully !", data: data });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        msg: "server error ! Please try again !!",
        error: "server error ! Please try again !!",
      });
    });
};
///////////////////////////////////////////////// DEL
const userDel = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await User.deleteOne({ _id: new mongoose.Types.ObjectId(id)  })
    .then((data) => {
      res
        .status(200)
        .json({ status: true, msg: "Data deleted successfully !", data: data });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        msg: "server error ! Please try again !!",
        error: "server error ! Please try again !!",
      });
    });
};

module.exports = { getCountPro,getOnlyOne,getFive, getPagi, userPost, userPut, userDel };
