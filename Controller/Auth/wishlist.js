const mongoose = require("mongoose");
const Product = require("../../Model/product");
const Wishlist = require("../../Model/wishlist");

//////////////////////////////////////////GET all exclude

const getExcluded = async (req, res) => {
  const userID = req.userID;
  console.log("Handler is hit");
  console.log(userID);
  await Product.aggregate([
    { $match: { userID: { $ne: new mongoose.Types.ObjectId(userID) } } }, //  new mongoose.Types.ObjectId(userID) } },

    {
      $project: {
        __v: 0,
        status: 0,
        isDeleted: 0,
        dateOfRegister: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
  ])
    .then((data) =>
      res
        .status(200)
        .json({ status: true, msg: "Data get successfully !", data: data })
    )
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        status: false,
        msg: "server error ! Please try again !!",
        data: error,
      });
    });
};

////////////////////////////////////////////POST Wish
const addWish = async (req, res) => {
  const { wishProId } = req.body;
  const userID = req.userID;
  console.log("This is from  header", userID);
  await Wishlist.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userID),
        wishProId: new mongoose.Types.ObjectId(wishProId),
      },
    },
  ])
    .then(async (data) => {
      console.log(data.length);

      if (data.length == 0) {
        await Wishlist.create({
          _id: new mongoose.Types.ObjectId(userID),
          wishProId: new mongoose.Types.ObjectId(wishProId),
        })
          .then((data) => {
            res.status(200).json({
              status: true,
              msg: "Removed from wish list!",
              data: data,
            });
          })
          .catch((error) => {
            res.status(400).json({
              status: true,
              msg: "server error ! Please try again !!",
              data: error,
            });
          });

        
      } else {
        await Wishlist.deleteOne({
          _id: new mongoose.Types.ObjectId(userID),
          wishProId: new mongoose.Types.ObjectId(wishProId),
        })
          .then((data) => {
            res.status(200).json({
              status: true,
              msg: "Removed from wish list!",
              data: data,
            });
          })
          .catch((error) => {
            res.status(400).json({
              status: true,
              msg: "server error ! Please try again !!",
              data: error,
            });
          });

        
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        status: false,
        msg: "server error ! Please try again !!",
        data: error,
      });
    });
};

////////////////////////////////////////////////
module.exports = { getExcluded, addWish };
