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
      $match: {
        __v: 0,
      },
    },
    {
      $lookup: {
        from: "expense_1",
        localField: 'customerId',
        foreignField: "_id",
        as:"customerData",
        pipeline: [
          {
            $project: {
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
  productPost,
};
