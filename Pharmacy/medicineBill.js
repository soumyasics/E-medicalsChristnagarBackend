const mongoose = require("mongoose");

const hSchema = mongoose.Schema({
    pid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'prescriptions'
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    date:{
        type:Date,
        required:true
    },
    medications:[
        {
            
                "name": String,
                "available":String,
                "message": String,
                "count":Number,
                "price": Number
            
        }
    ],
    price:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('medbills', hSchema)
