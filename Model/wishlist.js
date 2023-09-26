const mongoose = require('mongoose') ;

const wishSchema = mongoose.Schema(
    
    {     
        _id:{   // customer id 
            type: mongoose.Schema.Types.ObjectId ,
            required:[true , ""]
        },
        wishProId:{    // wish  product id
          type: mongoose.Schema.Types.ObjectId ,
          required:[true , ""]
        } ,
        dateOfWish : {
            type: Date ,
            default : Date.now
        }
    } ,
    {
        timestamps: true
    },
)

const wish  = mongoose.model('customer_wish',wishSchema) ;
// 'expense_1' will be created inside mongo db collection 
module.exports = wish ;
