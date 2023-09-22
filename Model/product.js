const mongoose = require('mongoose') ;

const productSchema =  new mongoose.Schema(
    {
        name:{
            type:String ,
            required:[true , ""]
        } ,
        details : {
            type: String ,
            default : ''
        },
        dateOfRegister : {
            type: Date ,
            default : Date.now
        },
        status: {
            type: Boolean,
            default: true
          },
        isDeleted: {
            type: Boolean,
            default :true
        },
        price : {
            type: Number ,
            
            required:[true , ""]
        } ,
        customerId : {
        type : mongoose.Types.ObjectId
        }
    } ,
    {
        timestamps: true
    },
)

const Product  = mongoose.model('product_1',productSchema) ;
// 'product_1' will be created inside mongo db collection 
module.exports = Product ;
