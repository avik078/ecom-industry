const mongoose = require('mongoose') ;

const expenseSchema = mongoose.Schema(
    {
        name:{
            type:String ,
            required:[true , "Please enter a product name"]
        } ,
        category : {
            type: String ,
            default : ''
        },
        dateOfExpense : {
            type: Date ,
            default : Date.now
        },
        amount : {
            type: Number ,
            default : 0
        },
        createdBy : {
            type :String ,
            default: ''
        } 
    } ,
    {
        timestamps: true
    },
)

const Expense  = mongoose.model('expense_1',expenseSchema) ;
// 'expense_1' will be created inside mongo db collection 
module.exports = Expense ;
