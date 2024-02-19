const mongoose= require("mongoose");

const Schema=mongoose.Schema({
    
    bookingid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'bookings'
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    testid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'tests'
    },
   
   
    comments:{
        type:String
    },
    
    resultdata: [{
        description:String,
        value:{
            type:Number,
            default:0
        },
        deviation:{
            type:Number,
            default:0
        },
        problem:{
            type:Boolean,
            default:false
        }
    }],
    comments:{
        type:String,
        default:"Everything is Normal,Have A Nice Day"
    },
    date:Date
});
module.exports=mongoose.model('results',Schema)
