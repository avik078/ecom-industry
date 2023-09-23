const mongoose = require("mongoose");
const Product = require("../../Model/product");

///////////////////////////////////////////GET Home
const productGetHome = (req, res) => {
  res.status(200).json({ data: "Hi This is API Home route" });
};

////////////////////////////////////////////GET
const productGet = async (req, res) => {
  await Product.aggregate([
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
      res
        .status(500)
        .json({
          status: false,
          msg: "server error ! Please try again !!",
          error: "server error !Please try again !!",
        });
    });
};

///////////////////////////////////////////// GET JOINED COLLECTION DATA
const joinedDataGet = async (req, res) => {
  await Product.aggregate([
   
    {
      $lookup: {
        from: "expense_1",
        localField: 'customerId',
        foreignField: "_id",
        as:"customerData",
        pipeline: [
          {
            $project: {
              createdBy:1 ,
              name: 1,
              category: 1
            }
          }
        ]
      },
    },
    {
      $unwind : "$customerData"
    } ,
    {
      $addFields:{
        cusName:"$customerData.createdBy"
      }
    },
    {
      $project: {
        __v: 0
      }
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
      res
        .status(500)
        .json({
          status: false,
          msg: "server error ! Please try again !!",
          error: "server error !Please try again !!",
        });
    });
};
/////////////////////////////////////////////////// GROUP Data 
const  groupProduct  = async (req,res) => {
  await Product.aggregate([
   
    {
      $lookup: {
        from: "expense_1",
        localField: 'customerId',
        foreignField: "_id",
        as:"customerData",
        // pipeline: [
        //   {
        //     $project: {
        //       createdBy:1 ,
        //       name: 1,
        //       category: 1
        //     }
        //   }
        // ]  // meaning less only those field will return which are mentioned in grouping 
      },
    },
    {
      $unwind :  "$customerData"
    } ,
    {
      $addFields:{
        cusName:"$customerData.createdBy"
      }
    },
    {$group : { _id:"$name" , customerArr : {$push : "$cusName"} }} ,
   
    {
      $project: {
        __v: 0
      }
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
      res
        .status(500)
        .json({
          status: false,
          msg: "server error ! Please try again !!",
          error: "server error !Please try again !!",
        });
    });
}
///////////////
// {$group : { _id:"$name" , customerArr : {$push : "$cusName"} }} ,

//////////////////////////////////////////////// POST
const productPost = async (req, res) => {
  const newOb = req.body;
  console.log(newOb);
  await Product.create(newOb)
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
        error: error,
      });
    });
};
/////////////////////////////////////////////////////////////////

module.exports = {
  productGetHome,
  productGet,
  joinedDataGet,
  groupProduct ,
  productPost,
};
