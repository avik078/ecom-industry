const mongoose = require("mongoose");
const User = require("../../Model/user");

////////////////////////////////////////////////// GET
const getFive = async (req, res) => {
  await User.aggregate([
    {
      $match: {
        __v: 0,
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
      $match: {
        __v: 0,
      },
    },
    {
      $project: {
        __v: 0,
      }
      
    },
    {
        $skip:Number(skip) ,
      },
      {
        $limit: Number(limit) ,
      }
  ]).then( (data) => {
    res.status(200).json({
      status: true,
      msg: "Data get successfully !",
      data: data,
    });
  }).catch((error)=>{
       
    console.log("error log ..", error);
    res.status(500).json({
      status: false,
      msg: "server error ! Please try agagin !!",
      error: "server error ! Please try agagin !!",

  })
})
};
//////////////////////////////////////////////// POST
const userPost = async (req, res) => {
  const newOb = req.body;
  console.log(newOb);
  
  await User.create(newOb)
    .then((data) => {
        res
        .status(200)
        .json({status:true , msg: "Data uploaded successfully !", data: data });
    })
    .catch((error) => {
      res.status(500).json({status:false , msg:"server error ! Please try again !!" , error : "server error ! Please try again !!"});
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
        .json({ status:true ,msg: "Data changed successfully !", data: data });
    })
    .catch((error) => {
      res.status(500).json({ status:false , msg:"server error ! Please try again !!" , error : "server error ! Please try again !!"});
    });
};
///////////////////////////////////////////////// DEL
const userDel = async (req, res) => {
  const id = req.params.id; 
  console.log(id); 
  await User.deleteOne({ _id: id })
    .then((data) => {
        res
        .status(200)
        .json({ status:true ,msg: "Data deleted successfully !", data: data });
    })
    .catch((error) => {
      res.status(500).json({ status:false , msg:"server error ! Please try again !!" , error : "server error ! Please try again !!" });
    });
};

module.exports = { getFive, getPagi, userPost, userPut, userDel };
