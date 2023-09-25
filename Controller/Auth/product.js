const mongoose = require("mongoose");
const Product = require("../../Model/product");

 
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

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
        userID: new mongoose.Types.ObjectId("65118d914b347fa0baeb3059")
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
    {$group : { _id:"$name" , customerArr : {$push : "$cusName"} }},   
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
/////////////////////////////////////////////////////////////////GET rich user
const  avgCusExp = async(req,res) => {
   await Product.aggregate([ 
     {
      $lookup : {
      from: "expense_1",
      localField: 'customerId',
      foreignField: "_id",
      as:"customerData",
      pipeline: [
            {
                  $project: {
                    amount:1 ,
                    _id:0
                  }
            }
      ]
     } 
    },
    {
      $unwind: "$customerData"
    } ,
    {
      $addFields:{
      cusAmt:"$customerData.amount" ,

      }
    } ,
    {
      $addFields:{
        cusAmt: { $toInt: "$cusAmt" }
      }
  } , 
    {
      $group: {
            _id:"$name" ,
            avgExp:{$avg : "$cusAmt"  }    
          
      }
    }, 
    {
      $project: {
        name:1,
      cusAmt:1,
      avgExp:1
      }
    } , 
 
   ]).then((data) => {
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
  })
}
/////////////////////////////////////////////////////////////////////////////////
// {$group : { _id:"$name" , customerArr : {$push : "$cusName"} }} ,

//////////////////////////////////////////////// POST
//token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.IjY1MTE2OGQzODIyYmU0ZTYwYTVhNGRhNSI.MWTVmLHoFGHWmghlAfe0E_N-TRGl-ealY1ZE4cTfP5o"
const productPost = async (req, res) => {
   

  let newOb = req.body;
  const userID = req.userID 
  
  newOb = {...newOb,userID:userID}
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
////////////////////////////////////////////////////////////////////

module.exports = {
  productGetHome,
  productGet,
  joinedDataGet,
  groupProduct ,
  avgCusExp ,
  productPost,
};
