const mongoose= require("mongoose");

const doctorSchema=mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    hospitalid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'hospitals'
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
    specialization: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    isactive:{
        type: Boolean,
        default: true
    },
    affiliationnumber:{
        type: Number,
        required: true  
      },
    rating: {
        type: Number,
        default: 0
    }
});
module.exports=mongoose.model('doctors',doctorSchema)

