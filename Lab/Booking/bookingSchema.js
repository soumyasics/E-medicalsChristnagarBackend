const mongoose= require("mongoose");

const Schema=mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    testid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'tests'
    },
    
    time:{
        type:String
    },
  
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    comments:{
        type:String
    },
    approvedByLab:{
        type:String,
        default:true
    },result:{
        type:Boolean,
        default:false
    }
});
module.exports=mongoose.model('bookings',Schema)
