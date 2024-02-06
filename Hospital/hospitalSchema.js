const mongoose= require("mongoose");

const hSchema=mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    
    contact:{
        type:Number,
        required:true
    },
    
    district:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },  
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    password:{
        type:String,
        required:true
    },image:{
        type:Object
    },
    regno:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    }
});
module.exports=mongoose.model('hospitals',hSchema)

